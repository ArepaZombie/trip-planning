import type { Day } from "../../types";
import Icon from "../Utils/Icon";

export default function DayButton({ day, index }: { day: Day; index: number }) {
  const getState = () => {
    const date = new Date(day.date).setHours(0, 0, 0, 0);
    const now = new Date().setHours(0, 0, 0, 0);

    if (date == now) return "today";
    if (date > now) return "passed";
    if (date < now) return "not-passed";

    return "";
  };

  return (
    <div className={`day-button ${getState()}`}>
      <p className="n-day">{index + 1}</p>
      <a className="title-day" href={`/#/day/${day.id}`}>
        {day.title}
      </a>
      <a className="config-day" href={`/#/day/${day.id}/edit`}>
        <Icon icon="fa-cog" />
      </a>
    </div>
  );
}
