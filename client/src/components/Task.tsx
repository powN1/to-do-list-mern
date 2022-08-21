import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../stylesheets/Task.css";
import TaskModel from "../models/TaskModel";

interface ITaskProps extends TaskModel {
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
}

const Task: React.FC<ITaskProps> = ({ _id, text, isDone, tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState<string>(text);
  const [isEditionOn, setIsEditionOn] = useState<boolean>(false);

  const handleTaskEdition = (id: number) => {
    // Switches the edition mode.
    setIsEditionOn(!isEditionOn);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates the input value state
    setInputValue(e.target.value);
  };
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setIsEditionOn(!isEditionOn);
  };

  useEffect(() => {
    // Updates the tasks array with new task input value (text).
    const tasksCopy = tasks.map((task) => task);
    const taskIndex = tasksCopy.findIndex((task) => task._id === _id);
    tasksCopy[taskIndex].text = inputValue;
    setTasks(tasksCopy);
  }, [inputValue]);

  const handleTaskDeletion = (id: number) => {
    setTasks(tasks.filter((task) => task._id !== _id));
  };
  const handleTaskCompletion = (id: number) => {
    const tasksCopy = tasks.map((task) => task);
    const taskIndex = tasksCopy.findIndex((task) => task._id === _id);
    tasksCopy[taskIndex].isDone = !tasksCopy[taskIndex].isDone;
    setTasks(tasksCopy);
  };

  return (
    <div className="task">
      {isEditionOn ? (
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleInputEnter(e)}
        />
      ) : isDone ? (
        <p>
          {text}
          <span className="date">{new Date().toISOString().split("T")[0]}</span>
        </p>
      ) : (
        <p>{text}</p>
      )}

      <div className="task__icons-container">
        <span className="edit" onClick={() => handleTaskEdition(_id)}>
          <AiFillEdit />
        </span>
        <span className="delete" onClick={() => handleTaskDeletion(_id)}>
          <AiFillDelete />
        </span>
        <span className="done" onClick={() => handleTaskCompletion(_id)}>
          <MdDone />
        </span>
      </div>
    </div>
  );
};

export default Task;
