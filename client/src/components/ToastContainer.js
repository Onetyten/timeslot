"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToastContainer;
const react_hot_toast_1 = require("react-hot-toast");
function ToastContainer() {
    return (<react_hot_toast_1.Toaster toastOptions={{
            duration: 3000,
            style: {
                background: '#171717',
                color: '#ffffff',
                borderWidth: '1px',
                borderColor: '#3ECF8E',
                fontFamily: 'Inconsolata, monospace',
                fontSize: '14px',
                borderRadius: '0px'
            }
        }}/>);
}
