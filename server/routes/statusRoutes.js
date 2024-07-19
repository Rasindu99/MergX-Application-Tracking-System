const express = require('express');
const router = express.Router();
const cors = require('cors');
//const Status = require('../models/status');

const { updatestatus, getstatus, deleteStatuses,editStatus} = require('../controllers/statusController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

//route
router.post('/update',updatestatus);
router.get('/getstatus',getstatus);

router.delete('/deletestatus/:statusId', deleteStatuses);
router.put('/editStatus/:statusId',editStatus)

module.exports = router;