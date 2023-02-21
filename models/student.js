const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    college:{type:String,required:true},
    edu_status:{type:Boolean,required:true,default:false}
})

module.exports =mongoose.model('Student',studentSchema)