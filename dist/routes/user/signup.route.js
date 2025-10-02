"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const signUp_controller_1 = require("../../controller/signUp.controller");
router.post('/signup', signUp_controller_1.createUser);
exports.default = router;
