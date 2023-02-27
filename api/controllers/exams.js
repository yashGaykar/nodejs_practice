const mongoose = require("mongoose");

const Student = require('../models/student')
const Exam = require('../models/exam')

exports.addExams = async (req, res) => {
    const {exam_name,physics,chemistry,biology,mathematics,english}=req.body
    Student.findById(req.params.id)
        .exec()
        .then((stud) => {
            if (stud) {
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
            await exams.forEach(async (exam) => {
                const total = (exam.physics + exam.chemistry + exam.mathematics + exam.english + exam.biology)
                console.log(total);
                const percentage = total / 5
                console.log(percentage);
                const status = (percentage < 35 ? "fail" : "pass")
                console.log(status);
                Exam.findByIdAndUpdate(exam._id, {
                    total: total,
                    percentage: percentage,
                    status: status
                })
                    .exec()
                    .then()
            })
        })
}

