"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SpotlightBorder;
const clsx_1 = __importDefault(require("clsx"));
const injectCursorPosition = (e) => {
    document.documentElement.style.setProperty('--x', `${Math.round(e.clientX)}px`);
    document.documentElement.style.setProperty('--y', `${Math.round(e.clientY)}px`);
};
document.body.addEventListener('pointermove', injectCursorPosition);
function SpotlightBorder(props) {
    const { children, className } = props;
    return (<div className={(0, clsx_1.default)(`spotlight relative bg-box rounded-md before:absolute before:inset-0 before:pointer-events-none`, className)}>
       {children} 
    </div>);
}
