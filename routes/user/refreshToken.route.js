"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshToken_controller_1 = require("../../controller/refreshToken.controller");
const router = express_1.default.Router();
router.post("/token/session", refreshToken_controller_1.refreshAccessToken);
exports.default = router;
