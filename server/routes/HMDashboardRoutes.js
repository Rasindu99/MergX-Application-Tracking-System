const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getTotalJobPostings,getTotalPendingJobs,getcandidatecount,getTotalVacancies,getEvaluationCount } = require('../controllers/HMDashboardController');

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



module.exports = router;