"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.default = TimeslotList;
const lia_1 = require("react-icons/lia");
const CardCountdown_1 = __importDefault(require("./CardCountdown"));
const SpotlightBorder_1 = __importDefault(require("./SpotlightBorder"));
const md_1 = require("react-icons/md");
const tb_1 = require("react-icons/tb");
const react_1 = __importStar(require("react"));
const react_outside_click_handler_1 = __importDefault(require("react-outside-click-handler"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const axios_1 = __importDefault(require("axios"));
const api_1 = __importDefault(require("../../utils/api"));
const ci_1 = require("react-icons/ci");
const sl_1 = require("react-icons/sl");
function TimeslotList(props) {
    const { slot, setSlotList, displayedSlotIndex } = props;
    const [showOpts, setShowOpts] = (0, react_1.useState)(false);
    const [isdeleting, setIsDeleting] = (0, react_1.useState)(false);
    function HandleDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            setIsDeleting(true);
            try {
                const response = yield api_1.default.delete(`/slot/delete/${slot._id}`);
                if (response.data.success == false) {
                    return react_hot_toast_1.default.error(response.data.message);
                }
                setSlotList(prev => prev.filter(s => s._id !== slot._id));
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    (0, react_hot_toast_1.default)((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message);
                }
            }
            finally {
                setIsDeleting(false);
            }
        });
    }
    return (<SpotlightBorder_1.default className={` w-full sm:w-sm text-white ${isdeleting ? 'hidden' : 'flex'} relative flex-col p-3 sm:p-4 h-full items-center gap-4 justify-center text-center`}>
        <div className="flex w-full items-center gap-2 justify-between">
            <div>
                {slot.type == 'event' ? (<md_1.MdEvent className="text-xl text-primary"/>) : (<lia_1.LiaBirthdayCakeSolid className="text-xl text-primary"/>)}
            </div>
            {slot.name.length < 32 ? (<p className="capitalize text-center text-sm sm:text-lg text-white">
                {slot.name}
            </p>) : (<p className="capitalize text-center text-sm sm:text-lg text-white">
                {slot.name.slice(0, 24)}...
                </p>)}

            <div>
                <react_outside_click_handler_1.default onOutsideClick={() => { setShowOpts(false); }}>
                    <tb_1.TbDots onClick={() => { setShowOpts(!showOpts); }}/>
                    {showOpts &&
            <div className='absolute -right-2 z-10 top-10'>
                                <div onClick={HandleDelete} className='hover:bg-red-500 bg-box hover:border-0 cursor-pointer p-2 border border-border-muted'>
                                    Delete
                                </div>
                        </div>}
                </react_outside_click_handler_1.default>
            </div>
        </div>

    
            <div className="flex w-full justify-start gap-3 sm:gap-4 items-start ">
                <div className='border flex justify-center items-center overflow-hidden border-border-muted min-h-14 min-w-14 sm:min-w-20 sm:min-h-20 rounded-full'>
                    {slot.type == 'event' ? (<sl_1.SlEvent className='size-6 sm:size-9 text-muted'/>) : (<ci_1.CiUser className='size-6 sm:size-10 text-muted'/>)}
                </div>

                <div className='capitalize flex text-xs sm:text-sm flex-col justify-center gap-2 h-full'>
                    {slot.type == 'birthday' && (<div className='flex gap-1'>
                            <p className='text-muted'>Email:</p>
                                {slot.email.length < 32 ? (<p className='text-wrap'> {slot.email}</p>) : (<p className='text-wrap'> {slot.email.slice(0, 20)}... </p>)}
                        </div>)}
                    {slot.type == 'birthday' && (<div className='flex gap-1'>
                            <p className='text-muted'>Relationship:</p>
                            {slot.relationship.length < 32 ? (<p className="text-white">
                                    {slot.relationship}
                                </p>) : (<p className="text-white">
                                    {slot.relationship.slice(0, 24)}...
                                </p>)}
                        </div>)}
                    <div className="flex gap-1">
                    <p className='text-muted capitalize'>{slot.type} {slot.type == 'event' ? 'Date' : ''}:</p>
                    <p>
                        {new Date(slot.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    </div>
                </div>
            </div>
        <div className="flex w-full justify-center items-center bg-primary/20 p-2 text-primary rounded-md">
            <CardCountdown_1.default displayedSlotIndex={displayedSlotIndex} targetDate={new Date(slot.eventDate)}/>
        </div>
    </SpotlightBorder_1.default>);
}
