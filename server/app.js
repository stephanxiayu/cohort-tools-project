const env = require("./env");
const mongoose = require("mongoose");
const express = require("express");
// console.log(process.env.MONGO_CONNECTION_STRING);
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createHttpError = require("http-errors");
const cohortsRoutes = require("../server/routes/cohortsRoutes");
const studentsRoutes = require("../server/routes/studentsRoutes");

// Initialize Express app
const app = express();

// CORS middleware setup
app.use(
  cors({
    origin: process.env.WEBSITE_URL,
  })
);

// Other middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route handlers
app.use("/cohorts", cohortsRoutes);
app.use("/students", studentsRoutes);

// Error handling for not found endpoints
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint nicht gefunden"));
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("mongoose DB connected for Cohort Server");
    app.listen(process.env.PORT || 5005, () => {
      console.log(
        "Cohort Server running on Port: " + (process.env.PORT || 5005)
      );
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err.message);
  });
