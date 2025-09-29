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
exports.createSlotController = createSlotController;
const joi_1 = __importDefault(require("joi"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
const slot_schema_1 = __importDefault(require("../schema/slot.schema"));
const slotJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.when('type', {
        is: 'birthday',
        then: joi_1.default.string().email().required(),
        otherwise: joi_1.default.string().optional().allow("")
    }),
    type: joi_1.default.string().valid('birthday', 'event').required(),
    eventDate: joi_1.default.date().greater('now').required(),
    relationship: joi_1.default.string().optional().allow("")
});
function createSlotController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { value, error } = slotJoiSchema.validate(req.body);
        if (error) {
            console.log(error);
            return res.status(400).json({ message: `Invalid input ${error.message}`, error, success: false });
        }
        const { name, email, type, eventDate, relationship } = value;
        yield (0, mongoConnect_1.default)();
        const userId = req.userId;
        try {
            const slotExists = yield slot_schema_1.default.findOne({ userId, email, type: 'birthday' });
            if (slotExists && type == 'birthday') {
                return res.status(409).json({ message: 'Duplicate slots not allowed', success: false });
            }
            const newSlot = new slot_schema_1.default({ userId, name, email, type, eventDate, relationship });
            yield newSlot.save();
            return res.status(201).json({ message: "New time slot created", data: newSlot.toObject(), success: true });
        }
        catch (error) {
            console.log(`error creating timeslot ${error}`);
            return res.status(500).json({ message: "Internal server error", error, success: false });
        }
    });
}
