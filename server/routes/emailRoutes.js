const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createEmail, getuseremail, getadminemails, getrecruiteremails, gethiringmanageremails, getinterviewersemails, getcandidatesemails } = require('../controllers/emailController');
const upload = require('../helpers/upload');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createemail',upload.single('file'), createEmail);
//get all emails
router.get('/allemails', getuseremail);
//get admin emails
router.get('/getadminemails', getadminemails);
//get recruiter
router.get('/getrecruiteremails', getrecruiteremails);
//get hiring
router.get('/gethiringmanageremails', gethiringmanageremails);
//get interviewer emails
router.get('/getintervieweremails',getinterviewersemails);
//get candidate emails
router.get('/getcandidateemails', getcandidatesemails);


module.exports = router;