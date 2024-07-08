const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postqanda } = require('../controllers/qandaController');
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

//Routers
router.post('/postqanda', postqanda);

module.exports = router;