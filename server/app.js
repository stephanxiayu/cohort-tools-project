require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createHttpError = require("http-errors");
const cohortsRoutes = require("../server/routes/cohortsRoutes");
const studentsRoutes = require("../server/routes/studentsRoutes");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
app.use(
  cors({
    origin: process.env.WEBSITE_URL,
  })
);
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("cohorts", cohortsRoutes);
app.use("students", studentsRoutes);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// START SERVER
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint nicht gefunden"));
});

// Allgemeiner Fehler-Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
