const User = require('../models/user');


const getSingleUser = async (req, res) => {
  const user = res.user;
  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }
  res.status(200).json(user);
}

const editProfile = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(user.id, { ...req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }

}


module.exports = {
  getSingleUser,
  editProfile,
}