const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createJobPosting, getAllPendingJobPostings, getAllApprovedJobPostings,updateJobPosting,deleteJobPosting, updateExpiredStatus ,getNotExpiredJobposting, updateAcceptTrue } = require('../controllers/jobpostingController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createJobPosting',createJobPosting);
router.get('/getAllPendingJobPostings',getAllPendingJobPostings);
router.get('/getAllApprovedJobPostings',getAllApprovedJobPostings);
router.put('/updateJobPosting/:id', updateJobPosting);
router.put('/updateExpiredStatus/:id', updateExpiredStatus);
router.get('/getnotexpiredjobs',getNotExpiredJobposting)

router.delete('/deleteJobPosting/:id', deleteJobPosting);
router.put('/approvetrue/:id',updateAcceptTrue);







module.exports = router;
