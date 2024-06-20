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


feedbackRoute.post('/', createFeedback);
feedbackRoute.get('/', getFeedback);


module.exports = feedbackRoute;