const mongoose = require('mongoose');

const Student = require('../models/student')

exports.getAllStudents = ((req, res) => {
    Student.find()
        .select('_id name age gender status')
        .exec()
        .then((student) => {
            res.status(200).json(student)
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })

        })

})

exports.getStudentsById = ((req, res) => {
    id = req.params.id
    Student.findById(id)
        .select('_id name age gender status')
        .exec()
        .then((student) => {
            res.status(200).json(student)
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })
        })
})

exports.createStudent = (async (req, res) => {
    Student.find({ name: req.body.name })
        .exec()
        .then(async (student) => {
            if (student.length >= 1) {
                res.status(404).json({ "message": "Student with Name Already Exists" })
            }
            else {
                const student = new Student({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    gender: req.body.gender,
                    age: req.body.age
                })
                await student
                    .save()
                    .then((result) => {
                        res.status(201).json(result)
                    })
                    .catch((err) => {
                        res.status(400).json({
                            "error": err
                        })
                    })
            }
        })
})

exports.updateStudentById = ((req, res) => {
    id = req.params.id;
    Student.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age
        }
    )
        .then((result) => {
            Student.findById(id).exec().then((data) => {
                res.status(200).json({
                    "Previous Record": result,
                    "Updated Record": data
                })
            })
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })
        })


})

exports.deleteStudentById = ((req, res) => {
    id = req.params.id
    Student.findByIdAndDelete(id)
        .then((record) => {
            res.status(200).json({
                "message": "Deleted Sucessfully",
                "record": record
            })
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })
        })

})
