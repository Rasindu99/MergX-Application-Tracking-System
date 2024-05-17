const express = require('express');
const router = express.Router();
const cors = require('cors');
//const Status = require('../models/status');

const { updatestatus, getstatus, deleteStatuses} = require('../controllers/statusController');

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

module.exports = router;