const mongoose = require("mongoose");

const User = require('../models/user');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.login = ((req, res) => {

    User.findOne({ email: req.body.email })
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
                            userId: user._id,
                            role: user.role
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

exports.deleteUser = ((req, res) => {
    User.remove({ _id: req.params.id })
        .exec()
        .then(user => {
            res.status(200).json({
                message: "Deleted Successfully",
                record: user
            })
        })
        .catch((err => {
            res.status(400).json({
                error: err
            })
        }))
})

exports.getAdmins = (req, res) => { }