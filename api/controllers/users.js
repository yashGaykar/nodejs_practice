const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Exam = require('../models/exam')

exports.getAllUsers = ((req, res) => {
    User.find({ "role": "student" })
        .select('_id name age gender password role email')
        .exec()
        .then(async (users) => {


            const newUser = await Promise.all(users.map(async (user) => {
                const exam = await Exam.find({ studentId: user._id }).select('_id exam_name physics chemistry biology mathematics english percentage total status')
                const newUser = user.toObject();
                newUser.results = exam
                return newUser
            }))
            res.status(200).json(newUser)


            // users.forEach((user) => {
            //     Exam.find({ "studentId": (user._id).toString })
            //         .exec()
            //         .then((results) => {
            //             console.log(results)
            //             // user.result=results
            //         })
            //     console.log((user._id).toString)

            // })
            // res.status(200).json(exam)
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })
        })
})

exports.getUsersById = (async (req, res) => {
    id = req.params.id
    await User.findById(id).select('_id name age gender password role email')
        .exec()
        .then(async (user) => {
            const exam = await Exam.find({ studentId: id }).select('_id exam_name physics chemistry biology mathematics english percentage total status')
            const newUser = user.toObject();
            newUser.results = exam;
            return res.json(newUser)
        })
        .catch((err) => {
            res.status(400).json({
                "error": err
            })
        })
})

exports.createUser = (async (req, res) => {
    const { name, gender, age, password, role, email } = req.body;
    User.find({ name: name })
        .exec()
        .then(async (user) => {
            if (user.length >= 1) {
                res.status(404).json({ "message": "User with Name Already Exists" })
            }
            else {
                bcrypt.hash(password, 8, (err, hash) => {
                    if (err) {
                        res.status(500).json({ "error": err })
                    }
                    else {

                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: name,
                            gender: gender,
                            age: age,
                            password: hash,
                            role: role,
                            email: email,
                        })
                        user
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
            }
        })
})

exports.updateUserById = ((req, res) => {
    const { name, gender, age, password, role, email } = req.body;

    const id = req.params.id;
    User.findByIdAndUpdate(
        id,
        {
            name: name,
            gender: gender,
            age: age,
            password: password,
            role: role,
            email: email,
        }
    )
        .then((result) => {
            User.findById(id).exec().then((data) => {
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

exports.deleteUserById = ((req, res) => {
    id = req.params.id
    User.findByIdAndDelete(id)
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