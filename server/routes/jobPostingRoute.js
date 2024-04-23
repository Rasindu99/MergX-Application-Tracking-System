const express = require('express');
const router = express.Router();
const cors = require('cors');
const { jobposting } = require('../controllers/jobpostingController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/job',jobposting);






// Protected route with logging
//router.get('/protected-route', ProtectedRoute);


module.exports = router;
