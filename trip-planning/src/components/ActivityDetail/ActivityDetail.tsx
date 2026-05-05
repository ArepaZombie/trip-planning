import { useEffect, useState } from "react";
import type { Activity } from "../../types";
import Icon from "../Utils/Icon";
import { getActivityInfo } from "../../firebase_firestore";
import "./ActivityDetail.css";
import ActivityDetailView from "./ActivityDetailView";
import ActivityDetailEdit from "./ActivityDetailEdit";

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
  const [onEdit, setOnEdit] = useState<Boolean>(false);

  useEffect(() => {
    const getData = async () => {
      if (activityId) {
        let result = await getActivityInfo(activityId, dayId);
        if (result) {
          result.tasks = result?.tasks.map((t, i) => {
            return { ...t, id: i };
          });
          setActivity(result);
        } else {
          setActivity({
            id: activityId,
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            destiny: "",
            icon: "",
            photos: [],
            tasks: [],
          } as Activity);
          setOnEdit(true);
        }
      }
    };

    getData();
  }, [activityId]);

  if (!activity)
    return (
      <div className="activity-loader">
        <h2>CARGANDO</h2>
      </div>
    );
  return (
    <div className="activity-panel">
      <Icon
        icon={activity?.icon || ""}
        style={{
          position: "absolute",
          top: "35%",
          left: "11%",
          opacity: "0.1",
          fontSize: 200,
          zIndex: -1,
        }}
      />
      {!onEdit ? (
        <ActivityDetailView
          dayId={dayId}
          activity={activity}
          setOnEdit={setOnEdit}
          activityId={activityId}
          setSelectedActivityId={setSelectedActivityId}
        />
      ) : (
        <ActivityDetailEdit
          dayId={dayId}
          activity={activity}
          setOnEdit={setOnEdit}
          activityId={activityId}
          setActivity={setActivity}
          setSelectedActivityId={setSelectedActivityId}
        />
      )}
    </div>
  );
}
