import { TextScramble } from "@skyshots/react-text-scrambler";
import type { RootState } from "../../utils/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface propType {
  name: string;
  eventDate: Date;
}

export default function Eventslot(props: propType) {
  const { name, eventDate } = props;
  const user = useSelector((state: RootState) => state.user.user);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [scrambled, setScrambled] = useState(true);

  useEffect(() => {
    setScrambled(true);
    const timer = setTimeout(() => setScrambled(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-80 h-4/5 flex gap-3 text-base sm:text-sm font-medium flex-col overflow-hidden justify-between p-4 text-primary border-2 border-primary cut-dual">
      <div className="flex flex-col justify-start gap-3 items-start">
        <div className="w-full flex justify-center items-center text-lg font-semibold">
          {scrambled ? (
            <TextScramble texts={["Event Reminder"]} nextLetterSpeed={30} letterSpeed={20} />
          ) : (
            <span>Event Reminder</span>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            To:
            {scrambled ? ( <TextScramble texts={[user?.email.slice(0,28) || "_________"]} nextLetterSpeed={10} letterSpeed={10} />
            ) : ( <span>{user?.email.slice(0,28) || "_________"}</span> )}
          </div>
          <div className="flex gap-2">
            Event:
            {scrambled ? (
              <TextScramble texts={[name.slice(0,28) || "_________"]} nextLetterSpeed={10} letterSpeed={10} />
            ) : ( <span>{name.slice(0,28) || "_________"}</span>)}
          </div>
          <div className="flex gap-2">
            Date:
            {scrambled ? (
              <TextScramble texts={[formattedDate || "_________"]} nextLetterSpeed={10} letterSpeed={10} />
            ) : (
              <span>{formattedDate || "_________"}</span>
            )}
          </div>
        </div>
        <div className="text-sm">
          {scrambled ? (
            <TextScramble texts={[`Hello ${user?.name || "______"}, This is a reminder for your upcoming event. We hope everything goes smoothly and you enjoy this occasion!`,]} nextLetterSpeed={3} letterSpeed={3} />
          ) : ( <span> Hello {user?.name || "______"}, This is a reminder for your upcoming event. We hope everything goes smoothly and you enjoy this occasion! </span>)}
        </div>
      </div>

      <div className="text-sm">
        {scrambled ? (
          <>
            <TextScramble texts={["Best regards,"]} nextLetterSpeed={10} letterSpeed={10} />
            <TextScramble texts={["Timeslot Reminder Service"]} nextLetterSpeed={10} letterSpeed={10} />
          </>
        ) : (
          <>
            <span>Best regards,</span>
            <br />
            <span>Timeslot Reminder Service</span>
          </>)}
      </div>
    </div>
  );
}
