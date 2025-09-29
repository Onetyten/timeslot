"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = __importDefault(require("./Dashboard"));
const Auth_1 = __importDefault(require("./Auth"));
const ToastContainer_1 = __importDefault(require("./components/ToastContainer"));
const react_redux_1 = require("react-redux");
const store_1 = require("../utils/store");
const react_1 = require("redux-persist/integration/react");
function App() {
    return (<react_redux_1.Provider store={store_1.store}>
      <react_1.PersistGate persistor={store_1.persistor}>
        <react_router_dom_1.BrowserRouter>
          <ToastContainer_1.default />
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path='/' element={<Dashboard_1.default />}/>
            <react_router_dom_1.Route path='/auth' element={<Auth_1.default />}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </react_1.PersistGate>
    </react_redux_1.Provider>);
}
exports.default = App;
