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
exports.default = NewSlotForm;
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const SpotlightBorder_1 = __importDefault(require("./SpotlightBorder"));
const react_1 = require("react");
const react_2 = require("@headlessui/react");
const io5_1 = require("react-icons/io5");
const ci_1 = require("react-icons/ci");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_redux_1 = require("react-redux");
const axios_1 = __importDefault(require("axios"));
const userInputValidate_1 = require("../../validation/userInputValidate");
const api_1 = __importDefault(require("../../utils/api"));
const react_router_dom_1 = require("react-router-dom");
const Eventslot_1 = __importDefault(require("./Eventslot"));
const Birthdayslot_1 = __importDefault(require("./Birthdayslot"));
const oneYear = 365 * 24 * 60 * 60 * 1000;
function NewSlotForm(props) {
    const { slotTypes, setDisplayedSlotIndex, setShowAddForm, setSlotList, displayedSlotIndex } = props;
    const [isloading, setIsLoading] = (0, react_1.useState)(false);
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [type, setType] = (0, react_1.useState)(slotTypes[displayedSlotIndex]);
    const [relationship, setRelationship] = (0, react_1.useState)("");
    const [eventDate, setEventDate] = (0, react_1.useState)(new Date(Date.now() + oneYear));
    const dateInputRef = (0, react_1.useRef)(null);
    const user = (0, react_redux_1.useSelector)((state) => state.user.user);
    const token = (0, react_redux_1.useSelector)((state) => state.token.token);
    const navigate = (0, react_router_dom_1.useNavigate)();
    function HandleAddSlot() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!token || !user) {
                return navigate('/auth');
            }
            if (isloading)
                return;
            const { error } = userInputValidate_1.slotJoiSchema.validate({ name, email, type, eventDate, relationship });
            if (error) {
                return (0, react_hot_toast_1.default)(error.message);
            }
            setIsLoading(true);
            try {
                let response;
                if (type == 'event') {
                    response = yield api_1.default.post('/slot/create', { name, email: user.email, type, eventDate, relationship });
                }
                else {
                    response = yield api_1.default.post('/slot/create', { name, email, type, eventDate, relationship });
                }
                if (response.data.success == false) {
                    return react_hot_toast_1.default.error(response.data.message);
                }
                setSlotList(prev => [response.data.data, ...(prev || [])]);
                if (type == 'event') {
                    setDisplayedSlotIndex(1);
                }
                else {
                    setDisplayedSlotIndex(0);
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    (0, react_hot_toast_1.default)((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message);
                }
            }
            finally {
                setIsLoading(false);
                setName("");
                setEmail("");
                setRelationship("");
                setEventDate(new Date(Date.now() + oneYear));
            }
        });
    }
    return (<div className='fixed flex justify-center text-white items-center w-screen h-screen bg-background/70 z-50 backdrop-blur-sm'>
        <SpotlightBorder_1.default className="w-full sm:w-[90%] relative max-w-[800px] h-[500px] flex text-sm">
            <div className="flex-1 p-4 h-full flex flex-col text-sm justify-between items-center">
                <div className="flex flex-col gap-1 items-center">

                    <div className="text-xl flex gap-2 font-semibold mt-6 text-nowrap sm:mt-0"> <react_text_scrambler_1.TextScramble texts={['Create a']} letterSpeed={30} nextLetterSpeed={30}/> <span className="text-primary"><react_text_scrambler_1.TextScramble texts={['Timeslot']} letterSpeed={30} nextLetterSpeed={30}/></span></div>
                    <div className="text-sm w-full text-center">
                        <react_text_scrambler_1.TextScramble key={type} texts={[type == 'event' ? 'Get email notifications about your upcoming events.' : 'Automatically send birthday emails to your selected contacts.']} letterSpeed={3} nextLetterSpeed={3} pauseTime={4000}/>
                    </div>
                    
                    <div className="flex flex-col mt-3 gap-2 items-center">
                        <input type='text' placeholder={`${type == 'birthday' ? 'Recipient name' : 'Event title'}`} value={name} onChange={(e) => { setName(e.target.value); }} className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3"/>

                        {type == 'birthday' && (<input type='text' value={relationship} onChange={(e) => { setRelationship(e.target.value); }} placeholder="Relationship to recipient" className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3"/>)}
                        
                        {type == 'birthday' && (<input type='email' value={email} onChange={(e) => { setEmail(e.target.value); }} placeholder='Recipient email' className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3"/>)}

                        <div className='flex flex-col sm:flex-row h-10 justify-between w-full items-center gap-2'>
                            <div className='flex-1 w-full sm:w-1/2 p-2 border border-muted h-full flex gap-2 items-center'>
                                <button type="button" className='text-2xl cursor-pointer'>
                                    <ci_1.CiCalendar onClick={() => { var _a; return (_a = dateInputRef.current) === null || _a === void 0 ? void 0 : _a.showPicker(); }}/>
                                </button>
                         
                                <p className=''>
                                    {eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} 
                                </p>

                                <input type="date" ref={dateInputRef} min={new Date().toISOString().split("T")[0]} name="" id="" className='size-5 sr-only' onChange={(e) => {
            const todaysDate = new Date();
            const changedDate = new Date(e.target.value);
            todaysDate.setHours(0, 0, 0, 0);
            changedDate.setHours(0, 0, 0, 0);
            if (changedDate >= todaysDate) {
                setEventDate(new Date(e.target.value));
            }
            else {
                (0, react_hot_toast_1.default)("Your due date cant be in the past");
            }
        }}/>
                            </div>
                            
                            <react_2.Listbox value={type} onChange={setType}>
                                <div className='relative w-full sm:translate-y-0 sm:w-1/2 border border-muted h-10 focus:outline-0'>
                                    <react_2.ListboxButton className='w-full h-full flex justify-between items-center p-2 capitalize'>
                                        {type}
                                        <io5_1.IoChevronDownSharp className='ml-2'/>
                                    </react_2.ListboxButton>
                                    <react_2.ListboxOptions className='absolute focus:outline-0 w-full bg-border-muted'>
                                        {slotTypes.map((item, index) => {
            return (<react_2.ListboxOption key={index} value={item} className={({ focus, selected }) => `cursor-pointer capitalize select-none p-2 ${focus ? "bg-primary text-white" : selected ? "bg-lightgrey" : ""}`}>
                                                        {item}
                                                    </react_2.ListboxOption>);
        })}
                                    </react_2.ListboxOptions>
                                </div>
                            </react_2.Listbox>
                        </div>

                        
                        
                    </div>
                </div>

                <div onClick={HandleAddSlot} className="flex flex-col gap-2 items-center">
                    <button className={`p-2 px-4 font-medium relative cursor-pointer ${isloading ? "bg-muted" : "hover:bg-primary-100 bg-primary"} text-background`}>
                        <react_text_scrambler_1.TextScramble texts={['Add']} letterSpeed={30} nextLetterSpeed={30}/>
                        {isloading && (<div className="absolute  text-2xl justify-center items-baseline inset-0 flex bg-muted/60">
                            <p className=" animate-spin">/</p>
                        </div>)}
                    </button>
                </div>
            </div> 

            <div className="flex-1 justify-center items-center h-full bg-background hidden md:flex flex-col text-sm">
                {type == "event" ? (<Eventslot_1.default name={name} eventDate={eventDate}/>) : (<Birthdayslot_1.default name={name} email={email} relationship={relationship} eventDate={eventDate}/>)}
            </div>

            <io5_1.IoClose onClick={() => { setShowAddForm(false); }} className='absolute right-3 top-3 text-2xl hover:text-primary'/>
            
        </SpotlightBorder_1.default>
    </div>);
}
