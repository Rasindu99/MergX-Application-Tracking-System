const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const UserModel = require('../models/user');
const { sendMail } = require('../helpers/sendMail');
const OtpModel = require('../models/otp');
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
                        education: user.education//
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

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

//forget password (check email and 4n number)
const forgetPassword = async (req, res) => {
    try {
        const { email, phone_number } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // Compare phone numbers
        const match = await comparePhoneNumber(phone_number, user.phone_number);
        if (!match) {
            return res.json({ error: 'Incorrect phone number' });
        }

        // Generate OTP
        const otp = generateVerificationCode();

        // Send OTP via email
        await sendMail(email, 'Password Reset Verification Code', `Your verification code is ${otp}`);

        // Save OTP to the database with TTL index
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 3); // Set expiration time to 3 minutes from now
        await OtpModel.create({
            user_email: email,
            user_phone_number: phone_number,
            otp: otp,
            createdAt: new Date(), // Add a createdAt field for reference
            expiresAt: expirationTime // Set expiration time
        });

        return res.json({ message: 'Verification code sent' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Helper functions
const comparePhoneNumber = async (providedPhoneNumber, storedPhoneNumber) => {
    return providedPhoneNumber === storedPhoneNumber;
};

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Example: 6-digit code
};

//forget pw (otp search db)
const checkOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        // Check OTP
        const otpRecord = await OtpModel.findOne({ otp });

        if (!otpRecord) {
            return res.json({
                error: 'OTP incorrect'
            });
        }

        return res.json({
            message: 'OTP is correct'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Change password
const changepassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        const otpRecord = await OtpModel.findOne({ otp });

        if (!otpRecord) {
            return res.json({ error: 'Invalid or expired OTP' });
        }

        const user = await User.findOne({ email: otpRecord.user_email });
        if (!user) {
            return res.json({ error: 'User not found' });
        }

        if (!newPassword || newPassword.length < 6) {
            return res.json({ error: 'Password is required and should be at least 6 characters' });
        }

        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();

        await OtpModel.findByIdAndDelete(otpRecord._id);

        const { email, fname, lname } = user;
        await sendMail(email, "Password is changed",
            `Hi ${fname} ${lname},\n\nYour user email: ${email},\nYour new password: ${newPassword}\n\nBest regards,\nMergeX\n(Application Tracking System)`
        );

        return res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    //test,
    registerUser,
    loginUser,
    getusers,
    getprofile,
    updateUser,
    deleteUser,
    logoutUser,
    forgetPassword,
    checkOtp,
    changepassword
   

  
};
