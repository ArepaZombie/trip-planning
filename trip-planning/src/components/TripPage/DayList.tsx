import type { Day } from "../../types";
import DayButton from "./DayButton";

export default function DayList({ days }: { days: Day[] }) {
  return (
    <div>
      <h2>DIAS</h2>
      {days.map((day) => {
        return <DayButton day={day} />;
      })}
    </div>
  );
}
