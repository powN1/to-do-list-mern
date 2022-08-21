const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: String,
  isDone: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
