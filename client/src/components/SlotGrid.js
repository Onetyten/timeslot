"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SlotGrid;
const TimeslotList_1 = __importDefault(require("./TimeslotList"));
function SlotGrid(props) {
    const { slotList, slotLoading, setSlotList, displayedSlotIndex } = props;
    if (slotLoading) {
        return (<div className="w-full mt-6 justify-center items-center gap-2 flex flex-col">
                <p>Loading Timeslots</p>
                <p className="animate-spin text-2xl text-primary"> / </p>
            </div>);
    }
    if (!slotLoading && slotList.length == 0) {
        return (<div className="w-full mt-6 justify-center items-center gap-4 flex">
                <p>No timeslot available, create a timeslot</p>
            </div>);
    }
    const birthdaySlots = slotList.filter(slot => slot.type == 'birthday');
    const eventSlots = slotList.filter(slot => slot.type == 'event');
    return (<div className="w-full mt-16 pb-6 flex-1 h-full items-center flex-col gap-3 overflow-y-scroll flex justify-start">
        {displayedSlotIndex == 0 ? (birthdaySlots.length == 0 ? (<div className="w-full justify-center items-center gap-4 mt-6 flex">
                    <p>No birthdays available, create a timeslot</p>
                </div>) :
            (<div className={`grid ${birthdaySlots.length < 2 ? 'grid-cols-1' : birthdaySlots.length == 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} mt-6 gap-4 w-full sm:w-auto items-center xs:px-8 px-2`}>  
                    {birthdaySlots.map((item, index) => {
                    return (<TimeslotList_1.default displayedSlotIndex={displayedSlotIndex} setSlotList={setSlotList} slot={item} index={index} key={index}/>);
                })}
                </div>)) : (eventSlots.length == 0 ? (<div className="w-full mt-6 justify-center items-center gap-4 flex">
                    <p> No events available, create a timeslot </p>
                </div>) :
            (<div className={`grid ${eventSlots.length < 2 ? 'grid-cols-1' : eventSlots.length == 2 ? 'grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} mt-6 gap-4 w-full sm:w-auto items-center xs:px-8 px-2`}>  
                {eventSlots.map((item, index) => {
                    return (<TimeslotList_1.default displayedSlotIndex={displayedSlotIndex} setSlotList={setSlotList} slot={item} index={index} key={index}/>);
                })}
            </div>))}
    </div>);
}
