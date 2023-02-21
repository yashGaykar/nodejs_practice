const express = require('express');
const mongoose= require("mongoose");

const url = "mongodb+srv://yashgaykar:Gaya%40193@cluster0.nj9yven.mongodb.net/?retryWrites=true&w=majority"

const app=express();

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

con.on('open',function(){
    console.log('connected....')
})

app.use(express.json())

const studentsRouter=require('./routers/students')
app.use('/students',studentsRouter)

app.listen(4000, ()=>{
    console.log("server started")
})