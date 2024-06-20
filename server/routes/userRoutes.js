const express = require('express');
const router = express.Router();

const protectRoute = require('../middleware/protectRoutes');
const getUsersForSidebar = require('../controllers/user.controller');


router.get("/", protectRoute, getUsersForSidebar);

module.exports = router;