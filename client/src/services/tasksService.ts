import axios from "axios";
import { TASKS_API_URL } from "../constants/api";
import TaskModel from "../models/TaskModel";

export const getTasks = async () => {
  try {
    const response = await axios.get(TASKS_API_URL);
    return response.data.tasks;
  } catch (err) {
    console.error(err);
  }
};

export const createTask = async (newTask: Partial<TaskModel>) => {
  try {
    const response = await axios.post(TASKS_API_URL, newTask);
    return response.data.task;
  } catch (err) {
    console.error(err);
  }
};
export const updateTask = async (newTask: Partial<TaskModel>) => {
  try {
    const response = await axios.put(
      `${TASKS_API_URL}/${newTask._id}`,
      newTask
    );
    return response.data.task;
  } catch (err) {
    console.error(err);
  }
};
export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${TASKS_API_URL}/${id}`);
    return response.data.task;
  } catch (err) {
    console.error(err);
  }
};
