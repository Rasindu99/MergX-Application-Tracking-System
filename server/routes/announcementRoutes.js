const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updateannouncement, getannouncement, deleteAnnouncement } = require('../controllers/announcementController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Routes
router.post('/updateannouncement', updateannouncement);
router.get('/getannouncement', getannouncement);
router.delete('/deleteannouncement/:announcementId', deleteAnnouncement);

module.exports = router;
