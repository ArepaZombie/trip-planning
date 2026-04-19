import { useEffect, useState } from "react";
import { getTripInfo } from "../firebase_firestore.js";

export default function TripPage() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    const getData = async () => {
      let result = await getTripInfo();
      console.log(result);
      setTrips(result);
    };

    getData();
  }, []);

  console.log(trips);

  return <>{trips && <h1>{trips.title}</h1>}</>;
}
