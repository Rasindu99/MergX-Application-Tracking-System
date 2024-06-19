const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    createEvalautions, 
    //  updateEvaluation,
      getEvaluation } = require('../controllers/evaluationController');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createevaluation',createEvalautions);
// router.put('/updateevaluation/:_id',updateEvaluation);
router.get('/',getEvaluation);

module.exports = router;