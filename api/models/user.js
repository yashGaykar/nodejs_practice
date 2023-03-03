const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    age: { type: Number, min: 5, max: 60, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], required: true, default: "student" },
})

module.exports = mongoose.model('User', userSchema)