import { TextScramble } from "@skyshots/react-text-scrambler";
import { useEffect, useState } from "react";

function getCountdown(targetDate: Date) {
  const now = new Date();

  if (targetDate <= now) return "Expired";

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
export default function CardCountdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(getCountdown(targetDate));
  const [scrambled, setScrambled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(()=>{
    setScrambled(true)
    setTimeout(()=>{
        setScrambled(false)
    },800)
  },[])

  return (
    <div className="text-sm sm:text-base">
      {scrambled ? (
        <TextScramble texts={[timeLeft]} letterSpeed={30} nextLetterSpeed={30} pauseTime={1500}/>
      ) : (
        <span>{timeLeft}</span>
      )}
    </div>
  )
}