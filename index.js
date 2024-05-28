const express = require("express");

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const analitycsRoutes = require("./routes/analitycs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(userRoutes);
app.use(taskRoutes);
app.use(analitycsRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(400).json({ errorMessage: error.message });
});

const server = app.listen(5000);
const io = require("./socket").init(server);
