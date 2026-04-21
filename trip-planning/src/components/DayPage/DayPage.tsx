import { useEffect, useState } from "react";
import { getDayInfo } from "../../firebase_firestore";
import type { Day } from "../../types";
import { useParams } from "react-router-dom";
import SchedulePanel from "../SchedulePanel/SchedulePanel";
import "./DayPage.css";
import InventoryPanel from "../InventoryPanel/InventoryPanel";
import BudgetWidget from "../BudgetWidget/BudgetWidget";
import ActivityDetail from "../ActivityDetail/ActivityDetail";

export default function DayPage() {
  const [day, setDay] = useState<Day>();
  const [time, setTime] = useState<number>();
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const { dayId } = useParams();

  const calculateTime = () => {
    const now = new Date();
    const inicio = new Date(now);

    //Valores desde las 6:00am
    inicio.setHours(6, 0, 0, 0);
    const msTotales = 19 * 60 * 60 * 1000;

    const msPasados = now.getTime() - inicio.getTime();

    return Math.round((msPasados / msTotales) * 100);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(intervalo);
  });

  useEffect(() => {
    const getData = async () => {
      if (dayId) {
        let result = await getDayInfo(dayId);
        setDay(result);
      }
    };
    getData();
  }, []);

  return (
    <>
      {day && (
        <div className="day-page">
          <div className="day-page-header">
            <h2>Día {day.n}</h2>
            <h1>{day.title}</h1>
          </div>
          <div className="screen-container">
            <div
              className="timer-panel"
              style={{
                background: `linear-gradient(
        var(--blue-dark) 0%,
        var(--blue-dark) ${time}%,
        var(--blue-dark-70) ${time + 1}%
      )`,
              }}
            ></div>
            {selectedActivityId === "" ? (
              <SchedulePanel
                activities={day.activities}
                setSelectedActivityId={setSelectedActivityId}
              />
            ) : (
              <ActivityDetail
                activityId={selectedActivityId}
                dayId={day.id}
                setSelectedActivityId={setSelectedActivityId}
              />
            )}
          </div>
          <InventoryPanel items={day.packingItems} />
          <BudgetWidget budget={day.budget} />
        </div>
      )}
    </>
  );
}
