"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Birthdayslot;
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
function Birthdayslot(props) {
    const { name, eventDate, email, relationship } = props;
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
    return (<div className="w-80 h-4/5 flex gap-3 font-medium flex-col text-base sm:text-sm overflow-hidden justify-between p-4 text-primary border-2 border-primary cut-dual">
      <div className="flex flex-col justify-start gap-3 items-start">
        <div className="w-full text-center flex justify-center items-center text-lg font-semibold">
          {scrambled ? (<react_text_scrambler_1.TextScramble texts={[`Happy birthday ${name.slice(0, 28)} 🥳`]} nextLetterSpeed={30} letterSpeed={20}/>) : (<span>Happy birthday {name.slice(0, 28)} 🥳</span>)}
        </div>

        <div>
          <div className="flex gap-2">
            To:
            {scrambled ? (<react_text_scrambler_1.TextScramble texts={[email.slice(0, 28) || "_________"]} nextLetterSpeed={10} letterSpeed={10}/>) : (<span>{email.slice(0, 28) || "_________"}</span>)}
          </div>
          <div className="flex gap-2">
            Date:
            {scrambled ? (<react_text_scrambler_1.TextScramble texts={[formattedDate || "_________"]} nextLetterSpeed={10} letterSpeed={10}/>) : (<span>{formattedDate || "_________"}</span>)}
          </div>
        </div>
        <div className="text-sm">
          {scrambled ? (<react_text_scrambler_1.TextScramble texts={[`Hi ${name.slice(0, 28) || "______"}, your dear ${relationship.slice(0, 28) || "______"} ${(user === null || user === void 0 ? void 0 : user.name.slice(0, 28)) || "______"} wanted to wish you the happiest of birthdays today! 🥳🎂✨May your day be filled with joy, laughter, and unforgettable moments. Here’s to another amazing year ahead—full of new adventures, success, and everything you’ve been wishing for.`]} nextLetterSpeed={3} letterSpeed={3}/>) : (<span> Hi {name.slice(0, 28) || "______"}, your dear {relationship.slice(0, 20) || "______"} {(user === null || user === void 0 ? void 0 : user.name.slice(0, 28)) || "______"} wanted to wish you the happiest of birthdays today! 🥳🎂✨May your day be filled with joy, laughter, and unforgettable moments. Here’s to another amazing year ahead—full of new adventures, success, and everything you’ve been wishing for.</span>)}
        </div>
      </div>

      <div className="text-sm">
        {scrambled ? (<>
            <react_text_scrambler_1.TextScramble texts={["Best regards,"]} nextLetterSpeed={10} letterSpeed={10}/>
            <react_text_scrambler_1.TextScramble texts={[`${name.slice(0, 28) || "______"}`]} nextLetterSpeed={10} letterSpeed={10}/>
          </>) : (<>
            <span>Best regards,</span>
            <br />
            <span>{name.slice(0, 28) || "______"}</span>
          </>)}
      </div>
    </div>);
}
