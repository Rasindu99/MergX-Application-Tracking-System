const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createInterviewSchedule, getInterviewSchedules } = require('../controllers/interviewscheduleController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/interviewschedule', createInterviewSchedule);
router.get('/getinterviewschedule', getInterviewSchedules)



module.exports = router;