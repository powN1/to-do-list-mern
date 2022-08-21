import React from "react";
import "../stylesheets/Tasks.css";
import Task from "../components/Task";
import TaskModel from "../models/TaskModel";

interface ITasksProps {
  taskText: string;
  tasks: TaskModel[];
  setTasks: () => Promise<void>;
}

const Tasks: React.FC<ITasksProps> = ({ taskText, tasks, setTasks }) => {
  return (
    <div className="tasks-container">
      <div className="tasks-container-pending">
        <p>Active tasks</p>
        {tasks.map((task, i) => {
          if (!task.isDone) {
            return (
              <Task
                key={i}
                text={task.text}
                _id={task._id}
                isDone={task.isDone}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="tasks-container-done">
        <p>Completed tasks</p>
        {tasks.map((task, i) => {
          if (task.isDone) {
            return (
              <Task
                key={i}
                text={task.text}
                _id={task._id}
                isDone={task.isDone}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Tasks;
