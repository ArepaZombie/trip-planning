import type { Day } from "../../types";

export default function DayButton({ day }: { day: Day }) {
  console.log(day);
  return (
    <div>
      <a href={"/day/" + day.id}>
        {day.n} - {day.title}
      </a>
    </div>
  );
}
