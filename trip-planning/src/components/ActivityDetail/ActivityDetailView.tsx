import { useState, type ChangeEvent } from "react";
import { checkTask, updateBudget } from "../../firebase_firestore";
import type { Activity } from "../../types";
import Icon from "../Utils/Icon";
import TaskItemList from "./TaskItemList";
import { useNavigate } from "react-router-dom";

export default function ActivityDetailView({
  activity,
  dayId,
  activityId,
  setOnEdit,
  setSelectedActivityId,
}: {
  activity: Activity;
  dayId: string;
  activityId: string;
  setOnEdit: any;
  setSelectedActivityId: any;
}) {
  const [budget, setBudget] = useState<number>(0);
  const navigate = useNavigate();

  const handleBudgetUpdate = async () => {
    await updateBudget(dayId, budget);
    alert("Budget actualizado");
    setBudget(0);
    navigate(0);
  };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleTaskCheck = async (index: number, done: boolean) => {
    await checkTask(dayId, activityId, index, done);
  };
  const handleGoToEdit = () => {
    setOnEdit(true);
  };

  const obligatoryTasks = activity?.tasks.filter((task) => !task.optional);
  const optionalTasks = activity?.tasks.filter((task) => task.optional);

  return (
    <div className="activity-detail">
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
          <a href={activity?.destiny}>DESTINO</a>
        </div>
        <div>
          <a onClick={handleGoToEdit}>EDITAR</a>
        </div>
      </div>
      <div className="activity-resourses">
        <label htmlFor="budget">Ingrese gastos:</label>
        <input
          type="number"
          name="budget"
          id="budget"
          onChange={handleBudgetChange}
        />
        <button onClick={handleBudgetUpdate}>OK</button>
      </div>
    </div>
  );
}
