import { useEffect, useState } from "react";
import { getTrips } from "../../firebase_firestore";

export default function LandingPage() {
  const [trips, setTrips] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        let results = await getTrips();

        setTrips(results);
      } catch (error) {}
    };

    getData();
  }, []);

  return (
    <>
      <h1>WIP</h1>
      {trips && <h1>{trips[0].title}</h1>}
    </>
  );
}
