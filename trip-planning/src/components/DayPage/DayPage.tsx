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
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const { dayId } = useParams();

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
        <div>
          <h3>Día {day.n}</h3>
          <h1>{day.title}</h1>
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
          <InventoryPanel items={day.packingItems} />
          <BudgetWidget budget={day.budget} />
        </div>
      )}
    </>
  );
}
