const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cohort = require('../models/Cohort.model')
const Student = require('../models/Student.model')

// ✅ GET /api/cohorts
router.get('/cohorts', (req, res) => {
	Cohort.find({})
		.then((allCohorts) => {
			console.log('🟢 Yaaayy all the cohorts are here'), res.status(200).json(allCohorts)
		})
		.catch((error) => {
			console.error('🔴 Failed to display cohorts', error)
			res.status(500).json({ error: '🔴 Failed to display cohorts' })
		})
})

// ✅ GET /api/cohorts/:cohortId
router.get('/cohorts/:cohortId', (req, res) => {
	const cohortId = req.params.cohortId

	Cohort.find({})
		.then((cohort) => {
			console.log('🟢 Found cohort ' + cohortId), res.status(200).json(cohort)
		})
		.catch((error) => {
			console.error('🔴 Failed to retrieve this cohort', error)
			res.status(500).json({ error: '🔴 Failed to retrieve this cohort' })
		})
})

// ✅ POST /api/cohorts
router.post('/cohorts', (req, res) => {
	Cohort.create(req.body)
		.then((createdCohort) => {
			console.log('🟢 Cohort successfully created'), res.status(201).json(createdCohort)
		})
		.catch((error) => {
			console.error('🔴 Failed to create cohort', error)
			res.status(500).json({ error: '🔴 Failed to create cohort' })
		})
})

// ✅ PUT /api/cohorts/:cohortId
router.put('/cohorts/:cohortId', (req, res) => {
	const cohortId = req.params.cohortId
	Cohort.findByIdAndUpdate(cohortId, req.body, { new: false })
		.then((updatedCohort) => {
			console.log('🟢 Cohort successfully updated'), res.status(204).json(updatedCohort)
		})
		.catch((error) => {
			console.error('🔴 Failed to update this cohort"', error)
			res.status(500).json({ error: '🔴 Failed to update this cohort' })
		})
})

// ✅ DELETE /api/cohorts/:cohortId
router.delete('/cohorts/:cohortId', (req, res) => {
	const cohortId = req.params.cohortId
	Cohort.findByIdAndDelete(cohortId)
		.then(() => {
			console.log('🟢 Cohort successfully deleted'), res.status(204).send()
		})
		.catch((error) => {
			console.error('🔴 Failed to delete this cohort', error)
			res.status(500).json({ error: '🔴 Failed to delete this cohort' })
		})
})

module.exports = router