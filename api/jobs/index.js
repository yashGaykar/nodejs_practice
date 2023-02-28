const Agenda = require('agenda')

const agenda = new Agenda({
    db: {
        address: process.env.DATABASE_URI,
    }
})

agenda
    .on('ready', () => console.log("Agenda is ready to start!"))
    .on('error', () => console.log("Agenda connection error!"));


module.exports = agenda