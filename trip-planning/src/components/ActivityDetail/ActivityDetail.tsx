import { useEffect, useState } from "react";
import type { Activity, Task } from "../../types";
import Icon from "../Utils/Icon";
import { checkTask, getActivityInfo } from "../../firebase_firestore";
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
        if (result) {
          result.tasks = result?.tasks.map((t, i) => {
            return { ...t, id: i };
          });
          setActivity(result);
        }
      }
    };

    getData();
  }, [activityId]);

  //TODO
  const handleBudgetUpdate = () => {
    console.log("ok");
  };

  const handleTaskCheck = async (index: number, done: boolean) => {
    await checkTask(dayId, activityId, index, done);
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
        <TaskItemList
          tasks={obligatoryTasks}
          handleTaskCheck={handleTaskCheck}
        />
        <p className="task-title">Opcionales:</p>
        <TaskItemList tasks={optionalTasks} handleTaskCheck={handleTaskCheck} />
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

function TaskItemList({
  tasks,
  handleTaskCheck,
}: {
  tasks?: Task[];
  handleTaskCheck: any;
}) {
  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheck={handleTaskCheck}
            />
          );
        })
      ) : (
        <p>No hay tareas ingresadas.</p>
      )}
    </>
  );
}

function TaskItem({
  task,
  handleTaskCheck,
}: {
  task: Task;
  handleTaskCheck: any;
}) {
  const [checked, setChecked] = useState<boolean>(task.done);

  useEffect(() => {
    handleTaskCheck(task.id, checked);
  }, [checked]);

  const checkHandler = () => {
    setChecked(!checked);
  };

  return (
    <div className="task-item">
      <input type="checkbox" checked={checked} onChange={checkHandler} />
      <p className={checked ? "checked-task" : ""}>{task.text}</p>
    </div>
  );
}
