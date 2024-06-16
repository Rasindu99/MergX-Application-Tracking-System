const Feedback = require('../models/feedback');
const expressAsyncHandler = require("express-async-handler");

const createFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const { rating, feedback, userId } = req.body;

    // Check if a feedback with the userId already exists
    let existingFeedback = await Feedback.findOne({ userId });

    if (existingFeedback) {
      // Update existing feedback
      existingFeedback.rating = rating;
      existingFeedback.feedback = feedback;
      const updatedFeedback = await existingFeedback.save();
      res.status(200).json(updatedFeedback);
    } else {
      // Create new feedback if no existing feedback found
      const newFeedback = new Feedback({ rating, feedback, userId });
      const savedFeedback = await newFeedback.save();
      res.status(201).json(savedFeedback);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getFeedback = expressAsyncHandler (async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createFeedback,
  getFeedback
};