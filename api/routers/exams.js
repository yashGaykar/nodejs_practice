const express = require('express');
const router = express.Router()
const checkRole= require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const { getExams, addExams } = require("../controllers/exams");

// Create Exam Result 
router.post('/:id',checkAuth,checkRole(['admin','teacher']), addExams)

//  Get Exam Result
router.get('/:id',checkAuth,checkRole(['admin','teacher','student']), getExams)




module.exports = router;