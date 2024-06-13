const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getinvitationsendisfalse, getinvitationsendistrue } = require('../controllers/jobinterviewinvitationController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/sendinvitation', getinvitationsendisfalse);
router.get('/sentinvitation', getinvitationsendistrue)

module.exports = router;