const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
//const multer = require('multer')

const test = (req, res) => {
    res.json('test is working superbly');
};

//register end point
const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, phone_number, password, role, education, bio, dob, gender, image } = req.body; 

        // Check if name was entered
        if (!fname || !lname) {
            return res.json({
                error: 'Name is required'
            });
        }

        // Check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters'
            });
        }

        // Check if email is already taken
        const emailexist = await User.findOne({ email });
        if (emailexist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        // check if number is already taken
        const phoneexist = await User.findOne({phone_number});
        if (phoneexist) {
            return res.json({
                error: 'Phone number is already taken'
            });
        }

        const hashedPassword = await hashPassword(password);

        // Create user in the database
        const user = await User.create({
            fname,
            lname,
            email,
            phone_number,
            password: hashedPassword,
            role,
            education,
            bio,
            dob,
            gender,
            image,
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//login end point
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (match) {
            //return res.json('Password match');
            jwt.sign({email: user.email, id: user._id,name: user.name },process.env.JWT_SECRET, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        } else {
            return res.json({ error: 'Incorrect password' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


//loging protectedRoute
const ProtectedRoute = async (req, res) =>{
    
}

//new function
const userImage = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you pass userId as a parameter
        const user = await User.findById(userId);

        if (!user || !user.image) {
            return res.status(404).json({ error: 'User or image not found' });
        }

        // Set the appropriate content type based on the image format
        const contentType = `image/${user.image.contentType}`;
        res.set('Content-Type', contentType);

        // Send the image data
        res.send(user.image.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
module.exports = {
    //test,
    registerUser,
    loginUser,
    userImage
};
