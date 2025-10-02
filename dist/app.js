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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoConnect_1 = __importDefault(require("./config/mongoConnect"));
const signup_route_1 = __importDefault(require("./routes/user/signup.route"));
const signin_route_1 = __importDefault(require("./routes/user/signin.route"));
const refreshToken_route_1 = __importDefault(require("./routes/user/refreshToken.route"));
const create_route_1 = __importDefault(require("./routes/slot/create.route"));
const fetch_route_1 = __importDefault(require("./routes/slot/fetch.route"));
const delete_route_1 = __importDefault(require("./routes/slot/delete.route"));
const authorization_1 = __importDefault(require("./middleware/authorization"));
const rootDir = __dirname.includes("dist") ? path_1.default.join(__dirname, "..") : __dirname;
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(rootDir, "client", "dist")));
app.use('/user', signup_route_1.default);
app.use('/user', signin_route_1.default);
app.use('/user', refreshToken_route_1.default);
app.use('/slot', authorization_1.default);
app.use('/slot', create_route_1.default);
app.use('/slot', fetch_route_1.default);
app.use('/slot', delete_route_1.default);
app.get('/hello', (req, res) => {
    res.status(200).json({ message: 'hello' });
});
app.get(/.*/, (req, res) => {
    res.sendFile(path_1.default.join(rootDir, "client", "dist", "index.html"));
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("connecting to db");
            yield (0, mongoConnect_1.default)();
            console.log("connected to db");
            // dailyCron()
            app.listen(port, (error) => {
                if (!error) {
                    console.log(`timeslot running on port ${port}`);
                }
                else {
                    console.log(`timeslot has runn into an error: ${error}`);
                }
            });
        }
        catch (error) {
            console.log(`Failed to connect to server: ${error}`);
        }
    });
}
startServer();
