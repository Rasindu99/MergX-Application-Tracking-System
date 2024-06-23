const express = require('express');
const router = express.Router();
const cors = require('cors');
const { uploadApplication, getApplicationsGroupedByJobId, approveApplication, rejectApplication,getapprovedtruedata} = require('../controllers/applicationController');
const upload = require('../helpers/upload');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

// Route for uploading application
router.post('/uploadapplication', upload.single('cv'), uploadApplication);
router.get('/getjobgroup',getApplicationsGroupedByJobId );
router.put('/approveapplication/:id', approveApplication);
router.put('/rejectapplication/:id', rejectApplication );
router.get('/getapprovedapplication',getapprovedtruedata)



module.exports = router;