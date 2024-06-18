const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postwishlist, getdetails,getdetailssubmittedfalse, getdetailssubmittedtrue } = require('../controllers/addWishlistController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Routes
router.post('/postaddwishlist', postwishlist );
router.get('/details', getdetails);
router.get('/detailssubmittedfalse', getdetailssubmittedfalse);
router.get('/detailssubmittedtrue', getdetailssubmittedtrue);

module.exports = router;
