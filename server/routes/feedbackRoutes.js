const express = require('express');
const feedbackRoute = express.Router();
const cors = require('cors');
const { createFeedback, getFeedback } = require('../controllers/feedbackController');

feedbackRoute.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);


feedbackRoute.post('/postFeedback', createFeedback);
feedbackRoute.get('/getFeedback', getFeedback);


module.exports = feedbackRoute;