const mongoose = require('mongoose')


const examsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required: true},
    exam_name:{type: String,enum:["Sem-1","Sem-2"], required:true},
    physics:{ type: Number, min: 0, max: 100 , required:true },
    chemistry:{ type: Number, min: 0, max: 100 , required:true },
    mathematics:{ type: Number, min: 0, max: 100 , required:true },
    english:{ type: Number, min: 0, max: 100 , required:true },
    biology:{ type: Number, min: 0, max: 100 ,required:true  },
    total:{ type: Number, min: 0, max: 500 },
    percentage:{ type: Number, min: 0, max: 100 },
    status: {type: String,enum: ['pending','pass', 'fail'], default: "pending"}
})

module.exports =mongoose.model('Exam',examsSchema)