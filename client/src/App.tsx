import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import Tasks from "./components/Tasks";
import TaskModel from "./models/TaskModel";
import { getTasks, createTask } from "./services/tasksService";

function App() {
  const [taskText, setTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    getTasksFromServer();
  }, []);

  const getTasksFromServer = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };
  const postTaskToServer = async () => {
    await createTask({ text: taskText, isDone: false });
    getTasksFromServer();
  };
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText === "" || taskText.length < 3) {
      return;
    } else {
      postTaskToServer();
      setTaskText("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  return (
    <div className="App">
      <header>Taskify</header>
      <div className="main-container">
        <Search
          inputValue={taskText}
          submit={handleSearchSubmit}
          change={handleInputChange}
        />
        <Tasks
          taskText={taskText}
          tasks={tasks}
          setTasks={getTasksFromServer}
        />
      </div>
    </div>
  );
}

export default App;
