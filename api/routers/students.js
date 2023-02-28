const express = require('express');
const router = express.Router()

const { getAllStudents, getStudentsById, createStudent, updateStudentById, deleteStudentById } = require('../controllers/students')

// Get Students
router.get('/', getAllStudents)

// Get Students By ID
router.get('/:id', getStudentsById)

// Create Student
router.post('/', createStudent)

// Update Student
router.patch('/:id', updateStudentById)

// Delete Student
router.delete('/:id', deleteStudentById)

module.exports = router