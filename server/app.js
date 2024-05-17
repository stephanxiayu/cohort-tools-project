const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohortsData = "/data/cohorts.json"
const studentsData = "/data/students.json"


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// MONGOOSE
const MONGODB_URI = "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

  
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

const Student = require('./models/Student.model')
const Cohort = require('./models/Cohort.model')

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const allRoutes = require("./routes");
app.use("/", allRoutes);

const cohortsRouter = require("./routes/cohorts.routes");
app.use("/api", cohortsRouter);

const studentsRouter = require("./routes/students.routes");
app.use("/api", studentsRouter);


// const { errorHandler, notFoundHandler } = require("./middleware/errorHandling");
// app.use(errorHandler);
// app.use(notFoundHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});