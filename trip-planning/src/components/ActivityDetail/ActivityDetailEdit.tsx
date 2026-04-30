import { useState, type ChangeEvent } from "react";
import type { Activity, Task } from "../../types";
import Icon from "../Utils/Icon";
import TaskItemList from "./TaskItemList";
import { deleteActivity, updateActivityInfo } from "../../firebase_firestore";

export default function ActivityDetailEdit({
  activity,
  dayId,
  activityId,
  setOnEdit,
  setActivity,
  setSelectedActivityId,
}: {
  activity: Activity;
  dayId: string;
  activityId: string;
  setOnEdit: any;
  setActivity: any;
  setSelectedActivityId: any;
}) {
  const handleGoToView = () => {
    setOnEdit(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setActivity((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTaskEdit = (e: ChangeEvent<HTMLInputElement>) => {
    let new_tasks = activity.tasks;
    const index = Number(e.target.id);
    new_tasks[index].text = e.target.value;

    setActivity((prev: any) => ({ ...prev, tasks: new_tasks }));
  };

  const handlerNewTask = (text: string, optional: boolean) => {
    let new_tasks = activity.tasks;

    new_tasks.push({
      id: new_tasks.length,
      text: text,
      optional: optional,
      done: false,
    });

    setActivity((prev: any) => ({ ...prev, tasks: new_tasks }));
  };

  const handleUpdateActivity = async () => {
    if (window.confirm("¿Guardar cambios?")) {
      await updateActivityInfo(activityId, dayId, activity);
    }
    handleGoToView();
  };

  const handleDeleteActivity = async () => {
    if (window.confirm("¿Borrar actividad?")) {
      await deleteActivity(activityId, dayId);
    }
    setSelectedActivityId("");
  };

  const iconOptions = [
    { name: "fa-plane", description: "Vuelo" },
    { name: "fa-car", description: "Transporte" },
    { name: "fa-utensils", description: "Comida" },
    { name: "fa-star", description: "Destino" },
    { name: "fa-compass", description: "Caminata" },
    { name: "fa-landmark", description: "Cultura" },
    { name: "fa-tree", description: "Naturaleza" },
    { name: "fa-bed", description: "Check-in" },
    { name: "fa-camera", description: "Fotos" },
    { name: "fa-map-pin", description: "Punto Clave" },
  ];
  const obligatoryTasks = activity?.tasks.filter((task) => !task.optional);
  const optionalTasks = activity?.tasks.filter((task) => task.optional);

  return (
    <div className="activity-edit">
      <div className="activity-header">
        <input
          id="title"
          name="title"
          className="title-detail"
          onChange={handleChange}
          value={activity?.title}
        />
        <Icon icon="fa-close" color="--blue-light" onClick={handleGoToView} />
      </div>
      <div className="activity-edit-schedule">
        <input
          id="startTime"
          name="startTime"
          type="time"
          min="06:00"
          max="24:00"
          className="startTime-detail"
          onChange={handleChange}
          value={activity?.startTime}
        />
        <input
          id="endTime"
          name="endTime"
          type="time"
          min="06:00"
          max="24:00"
          className="endTime-detail"
          onChange={handleChange}
          value={activity?.endTime}
        />
      </div>
      <div className="activity-edit-destiny">
        <input
          id="destiny"
          name="destiny"
          className="destiny-detail"
          onChange={handleChange}
          value={activity?.destiny}
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
          rel="stylesheet"
        />

        <select
          name="icon"
          id="icon"
          onChange={handleChange}
          defaultValue={activity.icon}
        >
          {iconOptions.map((i) => {
            return (
              <option
                value={i.name}
                //selected={i.name === activity.icon}
              >
                {i.description}
              </option>
            );
          })}
        </select>
      </div>
      <div className="activity-description">
        <p>Descripción:</p>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={activity.description}
        />
      </div>
      <div className="activity-tasks">
        <p className="task-title">Misiones:</p>
        <TaskItemList
          tasks={obligatoryTasks}
          handleChange={handleTaskEdit}
          isEdit
        />
        <TaskItemCreate handlerNewTask={handlerNewTask} optional={false} />
        <p className="task-title">Opcionales:</p>
        <TaskItemList
          tasks={optionalTasks}
          handleChange={handleTaskEdit}
          isEdit
        />
        <TaskItemCreate handlerNewTask={handlerNewTask} optional={true} />
      </div>
      <div className="activity-options">
        <div>
          <a onClick={handleDeleteActivity}>BORRAR</a>
        </div>
        <div className="save-activity-button">
          <a onClick={handleUpdateActivity}>GUARDAR</a>
        </div>
      </div>
    </div>
  );
}

function TaskItemCreate({
  handlerNewTask,
  optional,
}: {
  handlerNewTask: any;
  optional: boolean;
}) {
  const [newTaskText, setNewTaskText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const saveNewTask = () => {
    if (newTaskText) handlerNewTask(newTaskText, optional);
    setNewTaskText("");
  };

  return (
    <div className="task-item">
      <input
        id={"-1"}
        name="text"
        type="text"
        value={newTaskText}
        onChange={handleChange}
      />
      <Icon icon={"fa-square-plus"} onClick={saveNewTask} />
    </div>
  );
}
