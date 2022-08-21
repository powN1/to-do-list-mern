import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../stylesheets/Task.css";
import TaskModel from "../models/TaskModel";
import { updateTask, deleteTask } from "../services/tasksService";

interface ITaskProps extends TaskModel {
  tasks: TaskModel[];
  setTasks: () => Promise<void>;
}

const Task: React.FC<ITaskProps> = ({ _id, text, isDone, tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState<string>(text);
  const [isEditionOn, setIsEditionOn] = useState<boolean>(false);

  const handleTaskEdition = (id: string) => {
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
    const taskId = tasksCopy[taskIndex]._id;
    updateTask({ _id: taskId, text: inputValue });
    setTasks();
  }, [inputValue]);

  const handleTaskDeletion = async (id: string) => {
    await deleteTask(id);
    setTasks();
  };
  const handleTaskCompletion = async (id: string) => {
    const tasksCopy = tasks.map((task) => task);
    const taskIndex = tasksCopy.findIndex((task) => task._id === _id);
    const taskId = tasksCopy[taskIndex]._id;
    await updateTask({
      _id: taskId,
      isDone: !isDone,
    });
    setTasks();
  };

  return (
    <div className="task">
      {isEditionOn ? (
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleInputEnter(e)}
        />
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
