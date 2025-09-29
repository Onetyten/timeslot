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
exports.refreshAccessToken = refreshAccessToken;
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoConnect_1 = __importDefault(require("../config/mongoConnect"));
function refreshAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Add a jwt secret to the .env file");
        }
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "No refresh token provided", success: false });
        }
        yield (0, mongoConnect_1.default)();
        try {
            const user = yield user_schema_1.default.findOne({ "refreshToken.token": refreshToken });
            if (!user) {
                return res.status(401).json({ message: "Token either does not exist or has expired", success: false });
            }
            const matchedToken = user.refreshToken.find(t => t.token === refreshToken);
            if (!matchedToken) {
                return res.status(401).json({ message: "Token either does not exist or has expired", success: false });
            }
            if (new Date(matchedToken.expiresAt) < new Date()) {
                user.refreshToken.pull({ token: refreshToken });
                yield user.save();
                return res.status(401).json({ message: "Refresh Token has expired, redirecting to log in page.", success: false });
            }
            const payload = { id: user._id };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '6h' });
            return res.status(200).json({ message: "New token Assigned", data: token, success: true });
        }
        catch (error) {
            console.log("An unexpected error occurred while refreshing tokens. Please try again later.");
            res.status(500).json({ message: "An unexpected error occurred. Please try again later.", error, success: false });
        }
    });
}
