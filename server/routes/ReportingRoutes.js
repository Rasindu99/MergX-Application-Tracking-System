const express = require('express');
const router = express.Router();
const cors = require('cors');
const {getAllHiredCount,getTotalEvaluationsCount,getHiredCountByPosition} = require('../controllers/Reporting');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.get('/getallhiredcount',getAllHiredCount);
router.get('/gettotalacceptedapp',getTotalEvaluationsCount);
router.get('/gethiredcountbyposition',getHiredCountByPosition);

module.exports = router;