const express = require("express");
const tasksRouter = express.Router();
const TaskModel = require("../db/models/taskModel");

// Get all tasks
tasksRouter.get("/", (req, res) => {
  TaskModel.find({}, (err, tasks) => {
    if (err) return console.error(err);
    res.json({
      tasks,
    });
  });
});

// Get task by ID
tasksRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  TaskModel.findById(taskId, (err, task) => {
    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }
    if (err) {
      return console.error(err);
    }
    res.json({
      task,
      success: true,
    });
  });
});

// Add task
tasksRouter.post("/", (req, res) => {
  const newTask = new TaskModel(req.body);
  newTask.save().then((savedTask) => {
    res.json({ task: savedTask, success: true });
  });
});

// Delete task by ID
tasksRouter.delete("/:id", (request, response) => {
  const taskId = request.params.id;
  TaskModel.findByIdAndRemove(taskId, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (!res) {
      return response.status(404).json({
        message: "task not found",
      });
    }
    response.json({
      message: "deleted task by id",
    });
  });
});
// Update task by ID
tasksRouter.put("/:id", (request, response) => {
  const taskId = request.params.id;
  const updatedBody = request.body;
  TaskModel.findByIdAndUpdate(
    taskId,
    updatedBody,
    { new: true },
    (err, updatedTask) => {
      if (err) {
        console.log(err);
      }
      if (!updatedTask) {
        return response.status(404).json({
          message: "task not found for updating",
        });
      }
      response.json({
        message: "updated task by id",
        task: updatedTask,
      });
    }
  );
});

module.exports = { tasksRouter };
