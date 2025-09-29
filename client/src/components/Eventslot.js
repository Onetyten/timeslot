"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Eventslot;
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
function Eventslot(props) {
    const { name, eventDate } = props;
    const user = (0, react_redux_1.useSelector)((state) => state.user.user);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const [scrambled, setScrambled] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setScrambled(true);
        const timer = setTimeout(() => setScrambled(false), 100);
        return () => clearTimeout(timer);
    }, []);
    return (<div className="w-80 h-4/5 flex gap-3 text-base sm:text-sm font-medium flex-col overflow-hidden justify-between p-4 text-primary border-2 border-primary cut-dual">
      <div className="flex flex-col justify-start gap-3 items-start">
        <div className="w-full flex justify-center items-center text-lg font-semibold">
          {scrambled ? (<react_text_scrambler_1.TextScramble texts={["Event Reminder"]} nextLetterSpeed={30} letterSpeed={20}/>) : (<span>Event Reminder</span>)}
        </div>

        <div>
          <div className="flex gap-2">
            To:
            {scrambled ? (<react_text_scrambler_1.TextScramble texts={[(user === null || user === void 0 ? void 0 : user.email.slice(0, 28)) || "_________"]} nextLetterSpeed={10} letterSpeed={10}/>) : (<span>{(user === null || user === void 0 ? void 0 : user.email.slice(0, 28)) || "_________"}</span>)}
          </div>
          <div className="flex gap-2">
            Event:
            {scrambled ? (<react_text_scrambler_1.TextScramble texts={[name.slice(0, 28) || "_________"]} nextLetterSpeed={10} letterSpeed={10}/>) : (<span>{name.slice(0, 28) || "_________"}</span>)}
          </div>
          <div className="flex gap-2">
            Date:
            {scrambled ? (<react_text_scrambler_1.TextScramble texts={[formattedDate || "_________"]} nextLetterSpeed={10} letterSpeed={10}/>) : (<span>{formattedDate || "_________"}</span>)}
          </div>
        </div>
        <div className="text-sm">
          {scrambled ? (<react_text_scrambler_1.TextScramble texts={[`Hello ${(user === null || user === void 0 ? void 0 : user.name) || "______"}, This is a reminder for your upcoming event. We hope everything goes smoothly and you enjoy this occasion!`,]} nextLetterSpeed={3} letterSpeed={3}/>) : (<span> Hello {(user === null || user === void 0 ? void 0 : user.name) || "______"}, This is a reminder for your upcoming event. We hope everything goes smoothly and you enjoy this occasion! </span>)}
        </div>
      </div>

      <div className="text-sm">
        {scrambled ? (<>
            <react_text_scrambler_1.TextScramble texts={["Best regards,"]} nextLetterSpeed={10} letterSpeed={10}/>
            <react_text_scrambler_1.TextScramble texts={["Timeslot Reminder Service"]} nextLetterSpeed={10} letterSpeed={10}/>
          </>) : (<>
            <span>Best regards,</span>
            <br />
            <span>Timeslot Reminder Service</span>
          </>)}
      </div>
    </div>);
}
