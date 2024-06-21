const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getEvolution } = require('../controllers/HmFeedbackController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/',getEvolution );

module.exports = router;