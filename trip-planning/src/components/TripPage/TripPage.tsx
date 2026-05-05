import { useEffect, useState } from "react";
import {
  getDaysByTrip,
  getTripInfo,
  logOutFirebase,
} from "../../firebase_firestore";
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

  // const handleLogOut = async () => {
  //   await logOutFirebase();
  // };

  return (
    <div className="trip-page">
      {trip && days && (
        <div>
          <h1>{trip.title}</h1>
          <DayList days={days} />
        </div>
      )}

      {/* <div onClick={handleLogOut}>CERRAR SESION</div> */}
    </div>
  );
}
