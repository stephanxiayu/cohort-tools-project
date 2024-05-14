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


////////////// COHORTS

// GET /api/cohorts
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
  .then((allCohorts) => {
    console.log('🟢 Yaaayy all the cohorts are here'),
    res.status(200).json(allCohorts)
  })
  .catch((error) => {
    console.error('🔴 Failed to display cohorts', error);
    res.status(500).json({error: '🔴 Failed to display cohorts'})
  })
});

// ✅ GET /api/cohorts/:cohortId
app.get("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId

  Cohort.find({})
    .then((cohort) => {
      console.log('🟢 Found cohort ' + cohortId),
      res.status(200).json(cohort)
    })
    .catch((error) => {
      console.error('🔴 Failed to retrieve this cohort', error);
      res.status(500).json({error: '🔴 Failed to retrieve this cohort'})
    })
});

// ✅ POST /api/cohorts
app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
  .then((createdCohort) => {
    console.log('🟢 Cohort successfully created'),
    res.status(201).json(createdCohort)
  })
  .catch((error) => {
    console.error('🔴 Failed to create cohort', error);
    res.status(500).json({error: '🔴 Failed to create cohort'})
  })
});

// ✅ PUT /api/cohorts/:cohortId
app.put("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId
  Cohort.findByIdAndUpdate(cohortId, req.body, {new: false})
  .then((updatedCohort) => {
    console.log('🟢 Cohort successfully updated'),
    res.status(204).json(updatedCohort)
  })
  .catch((error) => {
    console.error('🔴 Failed to update this cohort"', error);
    res.status(500).json({error: '🔴 Failed to update this cohort'})
  })
});

// ✅ DELETE /api/cohorts/:cohortId
app.delete("/api/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId
  Cohort.findByIdAndDelete(cohortId)
  .then(() => {
    console.log('🟢 Cohort successfully deleted'),
    res.status(204).send()
  })
  .catch((error) => {
    console.error('🔴 Failed to delete this cohort', error);
    res.status(500).json({error: '🔴 Failed to delete this cohort'})
  })
});




////////////// STUDENTS

// ✅ GET /api/students
app.get("/api/students", (req, res) => {
  Student.find({})
  .then((allStudents) => {
    console.log('🟢 Yaaayy all the students are here'),
    res.status(200).json(allStudents)
  })
  .catch((error) => {
    console.error('🔴 Failed to display students', error);
    res.status(500).json({error: '🔴 Failed to display students'})
  })
});

// ✅ GET /api/students/cohort/:cohortId
app.get("/api/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId

  Student.find({cohort: cohortId}) // I'm so proud of that
  .then((allStudents) => {
    console.log('🟢 All the students in the cohort ' + cohortId + ' are here'),
    res.status(200).json(allStudents)
  })
  .catch((error) => {
    console.error('🔴 Failed to retrieve students from this cohort', error);
    res.status(500).json({error: '🔴 Failed to retrieve students from this cohort'})
  })
});

// ✅ GET /api/students/:studentId
app.get("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId
  Student.find({})
  .then((student) => {
    console.log('🟢 Say hi to student ' + studentId),
    res.status(200).json(student)
  })
  .catch((error) => {
    console.error('🔴 Failed to retrieve this student"', error);
    res.status(500).json({error: '🔴 Failed to retrieve this student'})
  })
});

// ✅ POST /api/students
app.post("/api/students", (req, res) => {
  Student.create(req.body)
  .then((createdStudent) => {
    console.log('🟢 Student successfully created'),
    res.status(201).json(createdStudent)
  })
  .catch((error) => {
    console.error('🔴 Failed to create student', error);
    res.status(500).json({error: '🔴 Failed to create student'})
  })
});

// ✅ PUT /api/students/:studentId
app.put("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId
  Student.findByIdAndUpdate(studentId, req.body, {new: false})
  .then((updatedStudent) => {
    console.log('🟢 Student successfully updated'),
    res.status(204).json(updatedStudent)
  })
  .catch((error) => {
    console.error('🔴 Failed to update this student"', error);
    res.status(500).json({error: '🔴 Failed to update this student'})
  })
});

// ✅ DELETE /api/students/:studentId
app.delete("/api/students/:studentId", (req, res) => {
  const studentId = req.params.studentId
  Student.findByIdAndDelete(studentId)
  .then(() => {
    console.log('🟢 Student successfully deleted'),
    res.status(204).send()
  })
  .catch((error) => {
    console.error('🔴 Failed to delete this student', error);
    res.status(500).json({error: '🔴 Failed to delete this student'})
  })
});



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});