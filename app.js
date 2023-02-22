const express = require('express');
const mongoose= require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const studentsRouter=require('./routers/students')



const url = process.env.DATABASE_URI

const app=express();

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(`Database not connected` + err);
	});const con=mongoose.connection

app.use(express.json())

app.use('/students',studentsRouter)

module.exports = app