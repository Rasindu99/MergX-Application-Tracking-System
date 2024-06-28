const express = require('express');
const router = express.Router();
const cors = require('cors');
const {getAllHiredCount,getTotalEvaluationsCount,getHiredCountByPosition,getAllApplicationCount,getTotalEvaluationsCountByPosition,getAllApplicationCountByJobId,getJobDetails,getTotalAcceptedApplicationsByPosition} = require('../controllers/Reporting');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.get('/getallhiredcount',getAllHiredCount);
router.get('/gettotalacceptedapp',getTotalEvaluationsCount);
router.get('/gethiredcountbyposition/:jobId',getHiredCountByPosition);
router.get('/getallapplicationcount',getAllApplicationCount);
router.get('/gettotalevaluationscountbyposition/:jobId',getTotalEvaluationsCountByPosition);
router.get('/getallapplicationcountbyjobid/:jobId',getAllApplicationCountByJobId);
router.get('/getjobdetails/:jobid',getJobDetails);
router.get('/gettotalacceptedapplicationsbyposition/:jobId',getTotalAcceptedApplicationsByPosition);

module.exports = router;