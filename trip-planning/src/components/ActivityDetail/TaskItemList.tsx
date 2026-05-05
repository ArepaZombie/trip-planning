import { useEffect, useState } from "react";
import type { Task } from "../../types";
import Icon from "../Utils/Icon";

export default function TaskItemList({
  tasks,
  handleTaskCheck,
  handleChange,
  isEdit = false,
}: {
  tasks?: Task[];
  handleTaskCheck?: any;
  handleChange?: any;
  isEdit?: boolean;
}) {
  const [editIndex, setEditIndex] = useState<number | false>(false);

  if (!tasks || tasks.length < 1) return <p>No hay tareas ingresadas</p>;

  return (
    <>
      {!isEdit
        ? tasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskCheck={handleTaskCheck}
              />
            );
          })
        : tasks.map((task) => {
            return (
              <TaskItemEdit
                task={task}
                key={task.id}
                editIndex={editIndex}
                handleChange={handleChange}
                setEditIndex={setEditIndex}
              />
            );
          })}
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

function TaskItemEdit({
  task,
  editIndex,
  handleChange,
  setEditIndex,
}: {
  task: Task;
  editIndex: number | false;
  handleChange: any;
  setEditIndex: any;
}) {
  let edit = editIndex === task.id;

  const checkHandler = () => {
    if (!edit) {
      setEditIndex(task.id);
    } else {
      setEditIndex(false);
    }
  };

  return (
    <div className="task-item">
      <Icon icon={!edit ? "fa-pen-to-square" : "fa-x"} onClick={checkHandler} />
      {!edit ? (
        <p>{task.text}</p>
      ) : (
        <input
          value={task.text}
          id={task.id.toString()}
          name="text"
          type="text"
          onChange={handleChange}
        />
      )}
    </div>
  );
}
