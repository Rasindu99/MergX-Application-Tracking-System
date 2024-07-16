const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createEmail } = require('../controllers/emailController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createemail', createEmail);


module.exports = router;