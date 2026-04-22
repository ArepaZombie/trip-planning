import { useEffect, useState } from "react";
import { getDaysByTrip, getTripInfo } from "../../firebase_firestore";
import type { Day, Trip } from "../../types";
import DayList from "./DayList";
import "./TripPage.css";

export default function TripPage() {
  const [trip, setTrip] = useState<Trip>();
  const [days, setDays] = useState<Day[]>();

  useEffect(() => {
    const getData = async () => {
      let result = await getTripInfo();
      setTrip(result);

      let daysResult = await getDaysByTrip();
      setDays(daysResult);
    };

    getData();
  }, []);

  return (
    <div className="trip-page">
      {trip && days && (
        <div>
          <h1>{trip.title}</h1>
          <DayList days={days} />
        </div>
      )}
    </div>
  );
}
