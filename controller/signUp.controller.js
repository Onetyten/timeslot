"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const mongodb_1 = require("mongodb");
const JoiUserSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoConnect_1.default)();
        const { error, value } = JoiUserSchema.validate(req.body);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: `invalid input ${error.message}`, error, success: false });
        }
        const { name, email, password } = value;
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = new user_schema_1.default({ name: name.toLowerCase(), email: email.toLowerCase(), password: hashedPassword });
            const savedUser = yield user.save();
            console.log(`User ${user.name} created`);
            const payload = {
                name: savedUser.name,
                email: savedUser.email
            };
            return res.status(201).json({ message: `User ${user.name} created`, data: payload, success: true });
        }
        catch (error) {
            console.log("error creating profile", error);
            if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
                return res.status(500).json({ message: `Email already exists, please log in`, error, success: false });
            }
            return res.status(500).json({ message: `Error creating profile, please try again`, error, success: false });
        }
    });
}
