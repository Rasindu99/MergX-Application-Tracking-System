const Interview = require('../models/interview'); 
const expressAsyncHandler = require("express-async-handler");


const getAllInterviews = expressAsyncHandler (async (req, res) => {
  try {
    const interviews = await Interview.find(); 
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
  getAllInterviews
};