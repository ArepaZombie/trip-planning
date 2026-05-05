import { useEffect, useState } from "react";
import {
  checkItem,
  getDayInfo,
  getDayNavbarIds,
} from "../../firebase_firestore";
import type { Day } from "../../types";
import { useParams } from "react-router-dom";
import SchedulePanel from "../SchedulePanel/SchedulePanel";
import "./DayPage.css";
import InventoryPanel from "../InventoryPanel/InventoryPanel";
import BudgetWidget from "../BudgetWidget/BudgetWidget";
import ActivityDetail from "../ActivityDetail/ActivityDetail";
import NavBar from "../NavBar/NavBar";

export default function DayPage() {
  const [day, setDay] = useState<Day>();
  const [time, setTime] = useState<number>();
  const [navBarInfo, setNavBarInfo] = useState<any>({
    dayIndex: "",
    nextUrl: "",
    previousUrl: "",
  });
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

  //Fetch data del día
  useEffect(() => {
    const getData = async () => {
      if (dayId) {
        let result = await getDayInfo(dayId);
        setDay(result);
      }
    };

    getData();
  }, [selectedActivityId]);

  //Contador
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(intervalo);
  });

  //get Navbar info
  useEffect(() => {
    const getNavbarInfo = async () => {
      const info = await getDayNavbarIds(dayId);
      setNavBarInfo({
        dayIndex: info.dayIndex,
        nextUrl: info.nextId ? `/#/day/${info.nextId}` : "",
        previousUrl: info.previousId ? `/#/day/${info.previousId}` : "",
      });
    };

    getNavbarInfo();
  }, []);

  const checkItemHandler = async (index: number, checked: boolean) => {
    await checkItem(dayId || "", index, checked);
  };

  const generateNewActivityId = () => {
    if (selectedActivityId) return "";

    if (day) {
      let dayN = day.id.split("-")[1];
      return `act-${dayN}-${day.activities.length + 1}`;
    }

    return "";
  };

  return (
    <>
      {day && (
        <div className="day-page">
          <div className="day-page-header">
            <h2>Día {navBarInfo.dayIndex + 1}</h2>
            <h1>{day.title}</h1>
          </div>
          <div className="screen-container">
            <div
              className="new-activity-button"
              onClick={() => setSelectedActivityId(generateNewActivityId())}
            ></div>
            <div
              className="timer-panel"
              style={{
                background: `linear-gradient(
        var(--blue-dark) 0%,
        var(--blue-dark) ${time}%,
        var(--blue-dark-70) ${time && time + 1}%
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
                dayId={day.id}
                activityId={selectedActivityId}
                setSelectedActivityId={setSelectedActivityId}
              />
            )}
          </div>
          <InventoryPanel
            items={day.packingItems}
            checkItemHandler={checkItemHandler}
          />
          <BudgetWidget budget={day.budget} />
        </div>
      )}
      <NavBar
        previous={navBarInfo.previousUrl}
        menu="/"
        next={navBarInfo.nextUrl}
      />
    </>
  );
}
