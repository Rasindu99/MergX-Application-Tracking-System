const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updateannouncement, getannouncement, deleteAnnouncement,editAnnouncement } = require('../controllers/announcementController');

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
router.put('/editAnnouncement/:announcementId', editAnnouncement)

module.exports = router;
