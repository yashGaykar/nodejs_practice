const { updateExamResults } = require("../controllers/exams");
const agenda = require("../jobs/index")


const JobHandlers = {
    updateExamResults: async (job, done) => {
        const { data } = job.attrs;
        try {
            await updateExamResults(data);
        }
        catch (err) {
            job.fail(new Error(err.message));
            await job.save();
            console.log(err.message)
        }
        done()
    }
}


module.exports = { JobHandlers }
