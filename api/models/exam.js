const mongoose = require('mongoose')


const examsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:'Student',required: true},
    exam_name:{type: String,enum:["Sem 1","Sem 2"], required:true},
    physics:{ type: Number, min: 0, max: 100 },
    chemistry:{ type: Number, min: 0, max: 100 },
    mathematics:{ type: Number, min: 0, max: 100 },
    english:{ type: Number, min: 0, max: 100 },
    biology:{ type: Number, min: 0, max: 100 },
    total:{ type: Number, min: 0, max: 500 },
    percentage:{ type: Number, min: 0, max: 100 },
    status: {type: String,enum: ['pending','pass', 'fail'], default: "pending"}
})

module.exports =mongoose.model('Exam',examsSchema)