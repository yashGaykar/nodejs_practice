const mongoose = require("mongoose");

const User = require('../models/user')
const Exam = require('../models/exam')

exports.addExams = async (req, res) => {
    const { exam_name, physics, chemistry, biology, mathematics, english } = req.body
    User.findById(req.params.id, { role: "student" })
        .exec()
        .then((user) => {
            if (user) {
                Exam.find({ studentId: req.params.id, exam_name: exam_name })
                    .exec()
                    .then(async (exam) => {
                        if (exam.length >= 1) {
                            return res.status(404).json({
                                message: "Result Exists Already",
                            });
                        }
                        else {
                            const exam = new Exam({
                                _id: new mongoose.Types.ObjectId(),
                                exam_name: exam_name,
                                studentId: req.params.id,
                                physics: physics,
                                chemistry: chemistry,
                                biology: biology,
                                mathematics: mathematics,
                                english: english,
                            });
                            exam
                                .save()
                                .then((result) => {
                                    res.status(201).json({
                                        "message": "Marks Added to Database",
                                        "record": result
                                    })
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(404).json({
                                        error: err,
                                    });
                                });
                        }
                    })
            } else {
                res.status(400).json({ "message": "Student Not Found" })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                error: err,
            });
        });
}


exports.getExams = async (req, res) => {

    Exam.find({ studentId: req.params.id })
        .populate({ path: "studentId", select: 'name' })
        .exec()
        .then(async (result) => {
            const a = (result[0].physics + result[0].chemistry);
            console.log(a);
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
}


exports.updateExamResults = async (data) => {
    Exam.find({ "status": "pending" })
        .exec()
        .then(async (exams) => {
            console.log(exams.length + " records are being updated")
            exams.forEach(async (exam) => {
                const total = (exam.physics + exam.chemistry + exam.mathematics + exam.english + exam.biology);
                const percentage = total / 5;
                const status = (percentage < 35 ? "fail" : "pass");
                Exam.findByIdAndUpdate(exam._id, {
                    total: total,
                    percentage: percentage,
                    status: status
                })
                    .exec()
                    .then();
            })
        })
}

