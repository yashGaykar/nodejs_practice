const { updateExamResults } = require("../controllers/exams");
const agenda = require("../jobs/index")


const JobHandlers = {
    updateExamResults: async (job, done) => {
        const { data } = job.attrs;
        await updateExamResults(data);

        agenda.on("complete", (job) => {
            console.log(`Job ${job.attrs.name} finished`);
        });

        agenda.on(`fail:${job.attrs.name}`, (err, job) => {
            console.log(`Job failed with error: ${err.message}`);
        });

        done();
    }
}


module.exports = { JobHandlers }
