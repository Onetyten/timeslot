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
exports.signInController = signInController;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const joi_1 = __importDefault(require("joi"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const userValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoConnect_1.default)();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return console.log("Add a jwt secret to the .env file");
        }
        const { error, value } = userValidationSchema.validate(req.body);
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: `Invalid input ${error.message}`, error, success: false });
        }
        const { email, password } = value;
        try {
            const user = yield user_schema_1.default.findOne({ email: email.toLowerCase() });
            if (!user) {
                console.log(`user ${email} does not exist`);
                return res.status(404).json({ message: "This user does not exist, sign up to create a timeslot account", success: false });
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                console.log(`user ${email} password incorrect`);
                return res.status(400).json({ message: "Incorrect password", success: false });
            }
            const payload = { id: user._id };
            const refreshToken = crypto_1.default.randomBytes(40).toString('hex');
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '6h' });
            user.refreshToken.push({ token: refreshToken, expiresAt });
            yield user.save();
            const userPayload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                refreshToken
            };
            console.log(`user ${user.name} signed in`);
            return res.status(200).json({ message: `Signed in, welcome ${user.name}`, data: userPayload, token, success: true });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error", success: false });
        }
    });
}
