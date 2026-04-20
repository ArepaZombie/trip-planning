import type { Activity } from "../../types";
import Icon from "../Utils/Icon";
import "./SchedulePanel.css";

export default function SchedulePanel({
  activities,
  setSelectedActivityId,
}: {
  activities: Activity[];
  setSelectedActivityId: any;
}) {
  const hours = Array.from({ length: 19 }, (_, i) => ({
    id: i + 1,
    time: `${String(i + 6).padStart(2, "0")}:00`,
  }));

  const calculatePosition = (hour: string) => {
    const [hora, minuto] = hour.split(":");
    let start = hours.find((h) => h.time === hora + ":00");

    let sumar = parseInt(minuto) >= 30 ? 1 : 0;

    return start && start?.id * 2 - 1 + sumar;
  };

  return (
    <div className="schedule-panel">
      {hours.map((hour) => {
        return (
          <div className="hour-cell" key={hour.id}>
            <p>{hour.time}</p>
          </div>
        );
      })}
      {activities.map((activity) => {
        return (
          <div
            className="activity-cell"
            key={activity.id}
            onClick={() => setSelectedActivityId(activity.id)}
            style={{
              gridRowStart: calculatePosition(activity.startTime),
              gridRowEnd: calculatePosition(activity.endTime),
            }}
          >
            <Icon icon={activity.icon} color="--blue-light" />
            <p>{activity.title}</p>
          </div>
        );
      })}
    </div>
  );
}
