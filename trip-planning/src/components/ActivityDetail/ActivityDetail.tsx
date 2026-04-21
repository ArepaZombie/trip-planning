import { useEffect, useState } from "react";
import type { Activity, Task } from "../../types";
import Icon from "../Utils/Icon";
import { getActivityInfo } from "../../firebase_firestore";
import "./ActivityDetail.css";

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
        console.log(result);
        setActivity(result);
      }
    };

    getData();
  }, [activityId]);

  //TODO
  const handleBudgetUpdate = () => {
    console.log("ok");
  };

  const obligatoryTasks = activity?.tasks.filter((task) => !task.optional);
  const optionalTasks = activity?.tasks.filter((task) => task.optional);

  return (
    <div className="activity-panel">
      <div
        className="activity-header"
        onClick={() => setSelectedActivityId("")}
      >
        <p className="title-detail"> {activity?.title}</p>

        <Icon icon="fa-close" color="--blue-light" />
      </div>
      <div className="activity-description">
        <p>Descripción:</p>
        <p>{activity?.description}</p>
      </div>
      <div className="activity-tasks">
        <p className="task-title">Misiones:</p>
        <TaskItemList tasks={obligatoryTasks} />
        <p className="task-title">Opcionales:</p>
        <TaskItemList tasks={optionalTasks} />
      </div>
      <div className="activity-options">
        <div>
          <a href="">PRUEBAS</a>
        </div>
        <div>
          <a href={activity?.destiny}>OBJETIVO</a>
        </div>
        <div>
          <a href="">EDITAR</a>
        </div>
      </div>
      <div className="activity-resourses">
        <label htmlFor="budget">Ingrese recursos usados:</label>
        <input type="number" name="budget" id="budget" />
        <button onClick={handleBudgetUpdate}>OK</button>
      </div>
    </div>
  );
}

function TaskItemList({ tasks }: { tasks?: Task[] }) {
  //TODO
  const handleChangeTask = () => {
    console.log("oktask");
  };

  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => {
          return (
            <div className="task-item" key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={handleChangeTask}
              />
              <p>{task.text}</p>
            </div>
          );
        })
      ) : (
        <p>No hay tareas ingresadas.</p>
      )}
    </>
  );
}
