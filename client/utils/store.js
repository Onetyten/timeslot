"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const toolkit_1 = require("@reduxjs/toolkit");
const redux_persist_1 = require("redux-persist");
const userSlice_1 = __importDefault(require("../state/userSlice"));
const tokenSlice_1 = __importDefault(require("../state/tokenSlice"));
const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage_1.default,
    whitelist: ['user', 'token']
};
const reducer = (0, toolkit_1.combineReducers)({
    user: userSlice_1.default,
    token: tokenSlice_1.default
});
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, reducer);
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
