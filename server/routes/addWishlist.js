const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postwishlist, getdetails } = require('../controllers/addWishlistController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Routes
router.post('/postaddwishlist', postwishlist );
router.get('/details', getdetails);

module.exports = router;
