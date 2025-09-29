"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Auth;
const react_1 = require("react");
const Signin_1 = __importDefault(require("./components/Signin"));
const SignUp_1 = __importDefault(require("./components/SignUp"));
function Auth() {
    const [authState, setAuthState] = (0, react_1.useState)('signin');
    return (<div className="flex w-full min-h-screen justify-center items-center">
        {authState == 'signin' ? <Signin_1.default setAuthState={setAuthState}/> : <SignUp_1.default setAuthState={setAuthState}/>}
    </div>);
}
