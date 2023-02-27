const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,enum: ['male', 'female']},
    age:{ type: Number, min: 12, max: 60 },
})

module.exports =mongoose.model('Student',studentSchema)