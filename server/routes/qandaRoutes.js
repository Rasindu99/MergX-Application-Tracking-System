const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postqanda, getmessage, getsendfalsemessage } = require('../controllers/qandaController');
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

//Routers
router.post('/postqanda', postqanda);
router.get('/getqanda',getmessage);
router.get('/getsendfalsemessage', getsendfalsemessage);

module.exports = router;