const express = require('express');
const router = express.Router();
const cors = require('cors');

const { createEmail } = require('../controllers/emailController');
const upload = require('../helpers/upload');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createemail',upload.single('file'), createEmail);


module.exports = router;