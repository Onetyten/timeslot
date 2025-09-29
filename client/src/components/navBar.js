"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavBar;
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const react_redux_1 = require("react-redux");
const fa6_1 = require("react-icons/fa6");
function NavBar(props) {
    const { slotTypes, setDisplayedSlotIndex, setShowAddForm, displayedSlotIndex } = props;
    const user = (0, react_redux_1.useSelector)((state) => state.user.user);
    return (<div className='w-full fixed z-20 bg-background h-16 flex justify-between items-center border-b border-border-muted px-3 sm:px-6'>
            <div className='capitalize flex sm:hidden text-3xl text-white'>
                <react_text_scrambler_1.TextScramble texts={[(user === null || user === void 0 ? void 0 : user.name.slice(0, 1)) || "A"]} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000}/>
            </div>
            <div className='capitalize hidden sm:flex text-3xl text-white max-w-20'>
                <react_text_scrambler_1.TextScramble texts={[(user === null || user === void 0 ? void 0 : user.name) || "Name"]} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000}/>
            </div>
            
            <div className='bg-box flex overflow-hidden rounded-sm'>
            {slotTypes.map((item, index) => {
            return (<div onClick={() => { setDisplayedSlotIndex(index); }} className={`cursor-pointer text-xs  sm:text-base capitalize p-1 px-4 w-20 sm:w-28 text-center ${index == displayedSlotIndex ? "bg-primary text-background" : ""}`} key={index}>
                    {item}s
                </div>);
        })}
            </div>

            <button onClick={() => { setShowAddForm(true); }} className={`p-2 px-4 hidden sm:flex font-medium relative cursor-pointer hover:bg-primary-100 bg-primary text-background`}>
                Add new slot
            </button>
            
            <button onClick={() => { setShowAddForm(true); }} className={`flex sm:hidden relative cursor-pointer hover:text-primary-100 text-xl text-primary`}>
                <fa6_1.FaPlus />
            </button>
        </div>);
}
