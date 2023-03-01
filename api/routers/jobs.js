const { jobs } = require('agenda/dist/agenda/jobs');
const express = require('express');
const router = express.Router()

const agenda = require('../jobs/index')
const checkAuth = require('../middleware/check-auth')
const checkRole = require('../middleware/check-role')


router.post('/results', checkAuth, checkRole(['admin','teacher']), async (req, res) => {
    const job = await agenda.jobs({
        data: req.body.key
    })
    if (job.length === 0) {
        agenda.start().then(async () => {
            agenda.now(`${req.body.name}`, `${req.body.key}`)
        })

        res.json({ "message": "Result is Being Updated" })
    }
    else {
        res.status(500).json({ "error": `Job with Key ${req.body.key} already exists. Please try with another key` })
    }
})


router.get('/results/:key', checkAuth, checkRole(['admin','teacher']), async (req, res) => {

    const job = await agenda.jobs({
        data: req.params.key
    })
    if (job.length === 0) {
        res.status(404).send('Job Not Found')
    }
    else {
        let job_info = {
            _id: job[0].attrs._id,
            name: job[0].attrs.name,
            startedAt: job[0].attrs.lastRunAt,
            key: job[0].attrs.body
        }
        if (!job[0].attrs.lastFinishedAt) {
            job_info.status = "pending"
            res.status(200).json(job_info)
        }
        else {
            job_info.lastFinishedAt = job[0].attrs.lastFinishedAt

            if (job[0].attrs.failedAt) {
                job_info.status = "failed"
                job_info.failedReason = job[0].attrs.failReason
                job_info.failedAt = job[0].attrs.failedAt
                res.status(200).json(job_info)
            }
            else {
                job_info.status = "success"
                res.status(200).json(job_info)
            }
        }
    }

})


module.exports = router;