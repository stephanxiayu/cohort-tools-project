const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cohort = require('../models/Cohort.model')
const Student = require('../models/Student.model')

// ✅ GET /api/students
router.get('/students', (req, res) => {
	Student.find()
		.populate('cohort')
		.then((allStudents) => {
			console.log('🟢 Yaaayy all the students are here'), res.status(200).json(allStudents)
		})
		.catch((error) => {
			console.error('🔴 Failed to display students', error)
			res.status(500).json({ error: '🔴 Failed to display students' })
		})
})

// ✅ GET /api/students/cohort/:cohortId
router.get('/students/cohort/:cohortId', (req, res) => {
	const cohortId = req.params.cohortId

	Student.find({ cohort: cohortId })
		.populate('cohort')
		.then((allStudents) => {
			console.log('🟢 All the students in the cohort ' + cohortId + ' are here'), res.status(200).json(allStudents)
		})
		.catch((error) => {
			console.error('🔴 Failed to retrieve students from this cohort', error)
			res.status(500).json({ error: '🔴 Failed to retrieve students from this cohort' })
		})
})

// ✅ GET /api/students/:studentId
router.get('/students/:studentId', (req, res) => {
	const studentId = req.params.studentId
	Student.find({})
		.populate('cohort')
		.then((student) => {
			console.log('🟢 Say hi to student ' + studentId), res.status(200).json(student)
		})
		.catch((error) => {
			console.error('🔴 Failed to retrieve this student"', error)
			res.status(500).json({ error: '🔴 Failed to retrieve this student' })
		})
})

// ✅ POST /api/students
router.post('/students', (req, res) => {
	Student.create(req.body)
		.then((createdStudent) => {
			console.log('🟢 Student successfully created'), res.status(201).json(createdStudent)
		})
		.catch((error) => {
			console.error('🔴 Failed to create student', error)
			res.status(500).json({ error: '🔴 Failed to create student' })
		})
})

// ✅ PUT /api/students/:studentId
router.put('/students/:studentId', (req, res) => {
	const studentId = req.params.studentId
	Student.findByIdAndUpdate(studentId, req.body, { new: false })
		.then((updatedStudent) => {
			console.log('🟢 Student successfully updated'), res.status(204).json(updatedStudent)
		})
		.catch((error) => {
			console.error('🔴 Failed to update this student"', error)
			res.status(500).json({ error: '🔴 Failed to update this student' })
		})
})

// ✅ DELETE /api/students/:studentId
router.delete('/students/:studentId', (req, res) => {
	const studentId = req.params.studentId
	Student.findByIdAndDelete(studentId)
		.then(() => {
			console.log('🟢 Student successfully deleted'), res.status(204).send()
		})
		.catch((error) => {
			console.error('🔴 Failed to delete this student', error)
			res.status(500).json({ error: '🔴 Failed to delete this student' })
		})
})

module.exports = router