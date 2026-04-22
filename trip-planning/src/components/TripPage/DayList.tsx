import type { Day } from "../../types";
import DayButton from "./DayButton";

export default function DayList({ days }: { days: Day[] }) {
  return (
    <div>
      {days.map((day) => {
        return <DayButton key={day.id} day={day} />;
      })}
    </div>
  );
}
