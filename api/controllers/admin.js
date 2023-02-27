const mongoose = require("mongoose");

const Student = require('../models/student');
const Exam = require('../models/exam');
const Admin = require('../models/admin');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signUp = (req, res) => {
    const { email, password } = req.body

    Admin.find({ email: req.body.email })
        .exec()
        .then((admin) => {
            if (admin.length > 0) {
                res.status(422).json({ message: "Email Already Exists" })
            }
            else {
                bcrypt.hash(req.body.password, 8, (err, hash) => {
                    if (err) {
                        res.status(500).json({ "error": err })
                    }
                    else {
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            email: email,
                            password: hash
                        });
                        admin
                            .save()
                            .then((result) => {
                                res.status(201).json({
                                    message: "User Created",
                                    record: result
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err
                                })
                            })

                    }
                })
            }
        })

}


exports.login = ((req, res) => {

    Admin.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: "Auth Failed" })
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                            process.env.JWT_SECRET_KEY,
                            {
                                expiresIn: "1h"
                            }
                        )
                        res.status(200).json({
                            "message": "Auth Successful",
                            token: token
                        })
                    }
                    else {
                        res.status(400).json({ message: "Auth Failed" })
                    }

                })
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})

exports.deleteAdmin = ((req, res) => {
    Admin.remove({ _id: req.params.id })
        .exec()
        .then(resut => {
            res.status(200).json({
                message: "Deleted Successfully",
                record: result
            })
        })
        .catch((err => {
            res.status(400).json({
                error: err
            })
        }))
})

exports.getAdmins = (req, res) => { }