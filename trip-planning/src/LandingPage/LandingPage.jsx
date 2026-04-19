import { useEffect, useState } from "react";
import { getTrips } from "../firebase_firestore";

export default function LandingPage() {
  const [trips, setTrips] = useState();

  useEffect(() => {
    const getData = async () => {
      let results = await getTrips();
      console.log(results);
      setTrips(results);
    };

    getData();
  }, []);

  console.log(trips);

  return (
    <>
      <h1>WIP</h1>
      {trips && <h1>{trips[0].title}</h1>}
    </>
  );
}
