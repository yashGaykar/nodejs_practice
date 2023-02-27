const express = require('express');
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const { getAllStudents, getStudentsById, createStudent, updateStudentById, deleteStudentById } = require('../controllers/students')

// Get Students
router.get('/',checkAuth, getAllStudents)

// Get Students By ID
router.get('/:id',checkAuth, getStudentsById)

// Create Student
router.post('/',checkAuth, createStudent)

// Update Student
router.patch('/:id',checkAuth, updateStudentById)

// Delete Student
router.delete('/:id',checkAuth, deleteStudentById)

module.exports = router