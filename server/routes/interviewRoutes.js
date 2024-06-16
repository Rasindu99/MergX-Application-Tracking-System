const express = require('express');
const interviewRoute = express.Router();
const cors = require('cors');
const { getAllInterviews } = require('../controllers/interviewController');

interviewRoute.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);


interviewRoute.get('/', getAllInterviews);


module.exports = interviewRoute;
