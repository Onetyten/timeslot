"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotJoiSchema = exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
exports.signinSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required()
});
exports.slotJoiSchema = joi_1.default.object({
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
