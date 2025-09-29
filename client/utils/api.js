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
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const store_1 = require("./store");
const userSlice_1 = require("../state/userSlice");
const tokenSlice_1 = require("../state/tokenSlice");
const baseURL = 
// @ts-ignore
import.meta.env.MODE === "development" ? "http://localhost:3210" : "";
const api = axios_1.default.create({
    baseURL,
});
api.interceptors.request.use((config) => {
    const state = store_1.store.getState();
    const token = state.token.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
let is_Refreshing = false;
let failedQueues = [];
const processQueue = (error, token = null) => {
    failedQueues.forEach(prom => {
        if (token) {
            prom.resolve(token);
        }
        else {
            prom.reject(error);
        }
    });
    failedQueues = [];
};
api.interceptors.response.use(response => response, (error) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const originalRequest = error.config;
    if (((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code) == "TOKEN_EXPIRED" && !originalRequest._retry) {
        if (is_Refreshing) {
            return new Promise((resolve, reject) => {
                failedQueues.push({
                    resolve: (token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    },
                    reject: (err) => reject(err)
                });
            });
        }
        is_Refreshing = true;
        originalRequest._retry = true;
        try {
            const res = yield axios_1.default.post(`${baseURL}/user/token/session`, { refreshToken: (_c = store_1.store.getState().user.user) === null || _c === void 0 ? void 0 : _c.refreshToken });
            const newToken = res.data.token;
            store_1.store.dispatch((0, tokenSlice_1.setToken)(newToken));
            processQueue(null, newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
        }
        catch (error) {
            processQueue(error, null);
            store_1.store.dispatch((0, userSlice_1.clearUser)());
            store_1.store.dispatch((0, tokenSlice_1.clearToken)());
            return Promise.reject(error);
        }
        finally {
            is_Refreshing = false;
        }
    }
    return Promise.reject(error);
}));
exports.default = api;
