const express = require('express');
const router = express.Router()

const agenda = require('../jobs/index')

router.post('/results', (req, res) => {

    agenda.start().then(async () => {
        agenda.now('updateExamResults')
    })

    res.json({ "message": "Result is Being Updated" })
})

router.get('/results/:name', async (req, res) => {
    const job = await agenda.jobs({ name: req.params.name })

    if (job.length === 0) {
        res.status(404).send('Job Not Found')
    }
    else {
        let status
        if (!job[0].attrs.lastFinishedAt) {
            status = "In Progress"
        }
        else {
            if (job[0].attrs.failedAt) {
                status = "Failed"
            }
            else {
                status = "Success"
            }
        }

        console.log(`Job status: ${status}`)
        res.json({ "Job status": status })
    }

})


module.exports = router;