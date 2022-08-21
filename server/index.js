// Defines require so you can use both require and import in the same file.
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { tasksRouter } = require("./routes/routes");
require("./db/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Witamy");
});

app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
