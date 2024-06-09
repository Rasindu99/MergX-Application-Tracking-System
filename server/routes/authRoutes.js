const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getprofile, getusers, updateUser, deleteUser, logoutUser,  forgetPassword, checkOtp, changepassword } = require('../controllers/authController');

//const ProtectedRoute = require('./ProtectedRoute'); // Import ProtectedRoute middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getprofile);
router.get('/getusers', getusers);
router.put('/users/:userId', updateUser);
router.delete('/deleteuser/:userId', deleteUser);
router.post('/logout',logoutUser);
router.post('/forgetpassword', forgetPassword);
router.post('/checkotp',checkOtp);
router.put('/changepassword',changepassword)




// Protected route with logging
//router.get('/protected-route', ProtectedRoute);


module.exports = router;
