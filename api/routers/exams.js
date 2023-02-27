const express = require('express');
const router = express.Router()
const checkAuth = require('../middleware/check-auth')


const { getExams, addExams } = require("../controllers/exams");

// Create Exam Result 
router.post('/:id',checkAuth, addExams)

//  Get Exam Result
router.get('/:id',checkAuth, getExams)




module.exports = router;