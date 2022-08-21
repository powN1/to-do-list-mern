// Defines require so you can use both require and import in the same file.
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { tasksRouter } = require("./routes/routes");
require("./db/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Witamy");
});

app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
