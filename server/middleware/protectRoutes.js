const jwt = require("jsonwebtoken");
const User = require('../models/user');

const protectRoute = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		jwt.verify(token, process.env.REACT_APP_JWT_SECRET, async (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: 'Invalid token' });
			}

			try {
				// Find user by id
				const user = await User.findById(decoded.id);
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
					bio: user.bio,
					phone_number: user.phone_number,
					education: user.education
				};

				req.user = user;
				next();
			} catch (error) {
				console.error('Error finding user:', error);
				res.status(500).json({ error: 'Server error' });
			}
		});
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = protectRoute;
