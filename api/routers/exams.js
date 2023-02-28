const express = require('express');
const router = express.Router()

const { getExams, addExams} = require("../controllers/exams");
 
// Create Exam Result 
router.post('/:id', addExams)

//  Get Exam Result
router.get('/:id', getExams)




module.exports = router;