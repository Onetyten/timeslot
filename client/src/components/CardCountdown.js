"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardCountdown;
const react_text_scrambler_1 = require("@skyshots/react-text-scrambler");
const react_1 = require("react");
function getCountdown(targetDate) {
    const now = new Date();
    if (targetDate <= now)
        return "Expired";
    let years = targetDate.getFullYear() - now.getFullYear();
    let months = targetDate.getMonth() - now.getMonth();
    let days = targetDate.getDate() - now.getDate();
    let hours = targetDate.getHours() - now.getHours();
    let minutes = targetDate.getMinutes() - now.getMinutes();
    let seconds = targetDate.getSeconds() - now.getSeconds();
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }
    return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function CardCountdown(props) {
    const { displayedSlotIndex, targetDate } = props;
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(getCountdown(targetDate));
    const [scrambled, setScrambled] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            setTimeLeft(getCountdown(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);
    (0, react_1.useEffect)(() => {
        setScrambled(true);
        setTimeout(() => {
            setScrambled(false);
        }, 800);
    }, [displayedSlotIndex]);
    return (<div className="text-sm sm:text-base">
      {scrambled ? (<react_text_scrambler_1.TextScramble texts={[timeLeft]} letterSpeed={30} nextLetterSpeed={30} pauseTime={1500}/>) : (<span>{timeLeft}</span>)}
    </div>);
}
