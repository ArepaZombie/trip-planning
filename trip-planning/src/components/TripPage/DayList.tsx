import type { Day } from "../../types";
import DayButton from "./DayButton";

export default function DayList({ days }: { days: Day[] }) {
  return (
    <div>
      {days.map((day, i) => {
        return <DayButton key={i} day={day} index={i} />;
      })}
    </div>
  );
}
