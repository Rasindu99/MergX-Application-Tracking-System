const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getTotalJobPostings,getTotalPendingJobs,getcandidatecount,getTotalVacancies,getEvaluationCount,gettodayInterviews,getcandidatedetails,getuserdetails,getadmincount,getrecruitercount,gethiringmanagers,getinterviewercount,getinterviewscount,getupcominginterviews} = require('../controllers/HMDashboardController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/totaljobpostingcount', getTotalJobPostings);
router.get('/totalpendingjobcount', getTotalPendingJobs);
router.get('/getcandidatecount', getcandidatecount);
router.get('/totalvacancies', getTotalVacancies);
router.get('/totalevaluations', getEvaluationCount);
router.get('/gettodayinterview',gettodayInterviews);
router.get('/getcandidatedetails',getcandidatedetails);
router.get('/getuserdetails',getuserdetails);
router.get('/getadmincount',getadmincount);
router.get('/getrecruitercount',getrecruitercount);
router.get('/gethiringmanagers',gethiringmanagers);
router.get('/getinterviewercount',getinterviewercount);
router.get('/getinterviewscount',getinterviewscount);
router.get('/getupcominginterviews',getupcominginterviews)


module.exports = router;