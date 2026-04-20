import { useEffect, useState } from "react";
import type { Activity } from "../../types";
import { getActivityInfo } from "../../firebase_firestore";

export default function ActivityDetail({
  activityId,
  dayId,
  setSelectedActivityId,
}: {
  activityId: string;
  dayId: string;
  setSelectedActivityId: any;
}) {
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    const getData = async () => {
      if (activityId) {
        let result = await getActivityInfo(activityId, dayId);
        setActivity(result);
      }
    };

    getData();
  }, [activityId]);

  return (
    <div>
      <p>{activity?.title}</p>
      <p>{activity?.destiny}</p>
      <p>{activity?.description}</p>

      <button onClick={() => setSelectedActivityId("")}>Volver</button>
    </div>
  );
}
