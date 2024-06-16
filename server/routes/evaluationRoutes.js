const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createEvalautions } = require('../controllers/evaluationController');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createevaluation',createEvalautions);

module.exports = router;