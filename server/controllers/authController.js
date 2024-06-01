const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const UserModel = require('../models/user');
const { sendMail } = require('../helpers/sendMail');

//const multer = require('multer')

const test = (req, res) => {
    res.json('test is working superbly');
};

//register end point
const registerUser = async (req, res) => {
    try {
        const {  fname, lname, email, phone_number, password, role, education, bio, dob, gender, image } = req.body; 

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

        sendMail(email,"Welcome Application Tracking System",
            `hi ${fname} ${lname},\n your user email : ${email},\n your password : ${password}\n\nBest regards,\nMergeX\n(Application Tracking System)`
    )

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
            jwt.sign({ id: user._id,fname: user.fname, lname: user.lname ,gender: user.gender, dob: user.dob, role : user.role  },process.env.REACT_APP_JWT_SECRET, {}, (err,token) => {
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




//get profile
const getprofile = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, {}, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            // Find user by id
            User.findById(decoded.id)
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    
                    // Include image data in the response
                    const userProfile = {
                        email: user.email,
                        _id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        gender: user.gender,
                        dob: user.dob,
                        role: user.role,
                        image: user.image, // Include the image data
                        bio:user.bio,
                        phone_number: user.phone_number,
                        education: user.education
                    };

                    res.json(userProfile);
                })
                .catch(error => {
                    console.error('Error finding user:', error);
                    res.status(500).json({ error: 'Server error' });
                });
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};

//get all user
const getusers = (req, res) => {
    try {
      UserModel.find()
        .then(users => res.json(users))
        .catch(error => res.json(error));
    } catch (error) {
     
      res.json(error);
    }
  };


// updateUser controller
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fname, lname, email, phone_number, password, role, education, bio, dob, gender, image } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Track role change
        const oldRole = user.role;

        // Update the user's information
        user.fname = fname;
        user.lname = lname;
        user.email = email;
        user.phone_number = phone_number;
        if (password) {
            user.password = await hashPassword(password);
        }
        user.role = role;
        user.education = education;
        user.bio = bio;
        user.dob = dob;
        user.gender = gender;
        user.image = image;

        // Save the updated user
        await user.save();

        // Send email notification if the role has changed
        if (role && role !== oldRole) {
            await sendMail(
                email,
                "Role Update Notification",
                `Hi ${fname} ${lname},\n\nYour role has been updated to ${role}.\n\nBest regards,\nMergeX\n(Application Tracking System)`
            );
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

  //delete user

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user to be deleted
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        // Send email notification
        await sendMail(user.email, "Account Deletion Notice", 
        `Hi ${user.fname} ${user.lname},\n\n your account has been deleted.\n\nBest regards,\nMergeX\n(Application Tracking System)`
    );

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user. Please try again later.' });
    }
};




module.exports = {
    //test,
    registerUser,
    loginUser,
    getusers,
    getprofile,
    updateUser,
    deleteUser
   

  
};
