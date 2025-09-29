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
exports.default = Signin;
const SpotlightBorder_1 = __importDefault(require("./SpotlightBorder"));
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const api_1 = __importDefault(require("../../utils/api"));
const userInputValidate_1 = require("../../validation/userInputValidate");
const axios_1 = __importDefault(require("axios"));
const react_redux_1 = require("react-redux");
const userSlice_1 = require("../../state/userSlice");
const tokenSlice_1 = require("../../state/tokenSlice");
const react_router_dom_1 = require("react-router-dom");
function Signin(prop) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { setAuthState } = prop;
    const [password, setPassword] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [isloading, setIsLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    function handleSignIn() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { error } = userInputValidate_1.signinSchema.validate({ email, password });
            if (error) {
                return (0, react_hot_toast_1.default)(error.message);
            }
            if (isloading)
                return;
            setIsLoading(true);
            try {
                const response = yield api_1.default.post('/user/signin', { email, password });
                if (response.data.success == false) {
                    return react_hot_toast_1.default.error(response.data.message);
                }
                dispatch((0, userSlice_1.setUser)(response.data.data));
                dispatch((0, tokenSlice_1.setToken)(response.data.token));
                navigate("/");
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    (0, react_hot_toast_1.default)((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message);
                }
            }
            finally {
                setIsLoading(false);
                setEmail("");
                setPassword("");
            }
        });
    }
    return (<SpotlightBorder_1.default className="w-full m-2 sm:m-0 sm:w-md h-[500px] p-4 flex flex-col text-sm justify-between items-center">
        <div className="flex flex-col gap-1 items-center">
            <div className="text-xl text-nowrap flex gap-2 font-semibold"> <react_text_scrambler_1.TextScramble texts={['Welcome to']} letterSpeed={30} nextLetterSpeed={30}/> <span className="text-primary"><react_text_scrambler_1.TextScramble texts={['Timeslot']} letterSpeed={30} nextLetterSpeed={30}/></span></div>
            <div className="text-sm w-full text-center">
                <react_text_scrambler_1.TextScramble texts={['The perfect birthday gift.', 'Never forget a special day again.', 'Save life’s most important moments.', 'Celebrate automatically with thoughtful emails.', 'Celebrate effortlessly, let us do the remembering.', 'Stay connected through every milestone.']} letterSpeed={30} nextLetterSpeed={10} pauseTime={4000}/>
            </div>
            <div className="flex flex-col mt-3 gap-2 items-center">
                <input type='email' value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3"/>
                <input type='password' value={password} onChange={(e) => { setPassword(e.target.value); }} placeholder="Password" className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3"/>
            </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
            <button onClick={handleSignIn} className={`p-2 px-4 font-medium relative cursor-pointer ${isloading ? "bg-muted" : "hover:bg-primary-100 bg-primary"} text-background`}>
                <react_text_scrambler_1.TextScramble texts={['Sign in']} letterSpeed={30} nextLetterSpeed={30}/>
                {isloading && (<div className="absolute text-2xl justify-center items-baseline inset-0 flex bg-muted/60">
                    <p className=" animate-spin">/</p>
                </div>)}

            </button>
            <div className="mt-2 flex text-nowrap gap-2 text-sm text-slate-300">
                <react_text_scrambler_1.TextScramble texts={[`Don't have an account?`]} letterSpeed={30} nextLetterSpeed={30}/>
                <span className="cursor-pointer hover:text-primary-100 text-primary" onClick={() => { setAuthState('signup'); }}>
                    <react_text_scrambler_1.TextScramble texts={[`sign up`]} letterSpeed={30} nextLetterSpeed={30}/>
                </span>
            </div>
        </div>
        
    </SpotlightBorder_1.default>);
}
