const express = require('express');
const mongoose= require("mongoose");

require('dotenv').config();

const url = process.env.URI

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