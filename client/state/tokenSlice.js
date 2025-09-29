"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.setToken = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    token: ''
};
const tokenSlice = (0, toolkit_1.createSlice)({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = '';
        }
    }
});
_a = tokenSlice.actions, exports.setToken = _a.setToken, exports.clearToken = _a.clearToken;
exports.default = tokenSlice.reducer;
