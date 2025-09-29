"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSlot_controller_1 = require("../../controller/createSlot.controller");
const router = express_1.default.Router();
router.post("/create", createSlot_controller_1.createSlotController);
exports.default = router;
