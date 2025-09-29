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
exports.default = Dashboard;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const navBar_1 = __importDefault(require("./components/navBar"));
const NewSlotForm_1 = __importDefault(require("./components/NewSlotForm"));
const SlotGrid_1 = __importDefault(require("./components/SlotGrid"));
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const api_1 = __importDefault(require("../utils/api"));
const slotTypes = ['birthday', 'event'];
function Dashboard() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [slotList, setSlotList] = (0, react_1.useState)([]);
    const [slotLoading, setSlotLoading] = (0, react_1.useState)(false);
    const user = (0, react_redux_1.useSelector)((state) => state.user.user);
    const token = (0, react_redux_1.useSelector)((state) => state.token.token);
    const [displayedSlotIndex, setDisplayedSlotIndex] = (0, react_1.useState)(0);
    const [showAddForm, setShowAddForm] = (0, react_1.useState)(false);
    function fetchSlots() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!token || !user) {
                navigate('/auth');
            }
            setSlotLoading(true);
            try {
                const res = yield api_1.default.get('/slot/fetch');
                if (res.data.success == false) {
                    return setSlotList([]);
                }
                setSlotList(res.data.data);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    (0, react_hot_toast_1.default)((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message);
                }
            }
            finally {
                setSlotLoading(false);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchSlots();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, token, user]);
    return (<main className='w-screen h-screen bg-background flex items-center flex-col gap-4 text-border-muted'>
            <navBar_1.default slotTypes={slotTypes} setShowAddForm={setShowAddForm} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex}/>
            <SlotGrid_1.default slotList={slotList} slotTypes={slotTypes} displayedSlotIndex={displayedSlotIndex} setSlotList={setSlotList} slotLoading={slotLoading}/>
            {showAddForm && <NewSlotForm_1.default setShowAddForm={setShowAddForm} slotTypes={slotTypes} setSlotList={setSlotList} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex}/>}
        </main>);
}
