const express = require('express');
const router = express.Router()

const Student = require('../models/student')

// Get Students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})

// Get Students By ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        res.json(student)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})


// Create Student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        college: req.body.college,
        edu_status: req.body.edu_status
    })
    try {
        const a = await student.save()
        res.json(a)
    }
    catch (err) {
        res.send('Error ' + err)
    }
})


// Update Student
router.patch('/:id', (req, res) => {
    Student.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            college: req.body.college,
            edu_status: req.body.edu_status
        }, (err, cb) => {
            if (!err) {
                Student.findById(req.params.id, (err, ud) => {
                    res.status(200).json({ message: "Updated Sucessfully", previous_data: cb, updated_data: ud })
                });
            }
            else {
                console.log(err);
                res.status(400).json({ message: err })
            }
        });
})



// Delete Student
router.delete('/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) {
                res.status(200).json({ message: "Deleted Sucessfully", record: data})
            
        }
        else {
            console.log(err);
            res.status(400).json({ message: err })
        }

    })


})

module.exports = router