"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchSlots_controller_1 = require("../../controller/fetchSlots.controller");
const router = express_1.default.Router();
router.get("/fetch", fetchSlots_controller_1.fetchSlotController);
exports.default = router;
