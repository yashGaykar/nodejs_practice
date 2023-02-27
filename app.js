// APP IMPORTS
const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser")

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// FILE IMPORTS
const studentsRouter = require('./api/routers/students')
const marksRouter = require("./api/routers/exams");
const jobsRouter = require("./api/routers/jobs")
const adminRouter = require("./api/routers/admin")

// APP SETUP
const app = express();

app.use(bodyParser.json());
app.use(express.json())


//MONGOOSE SETUP
const url = process.env.DATABASE_URI

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(`Database not connected` + err);
	}); const con = mongoose.connection


// ROUTES SETUP
app.use('/students', studentsRouter)
app.use('/exams', marksRouter)
app.use('/jobs', jobsRouter)
app.use('/admin', adminRouter)


app.use((req, res, next) => {
	const error = new Error("Page Not Found")
	error.status = 404;
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});


module.exports = app