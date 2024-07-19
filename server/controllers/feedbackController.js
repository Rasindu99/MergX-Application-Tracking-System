const Feedback = require('../models/feedback');
const expressAsyncHandler = require("express-async-handler");

const createFeedback = expressAsyncHandler(async (req, res) => {
  try {
    const { rating, feedback, userId, combinedData } = req.body;

    // Check if combinedData has required fields
    if (!combinedData || !combinedData.job_id || !combinedData.invitation_id) {
      return res.status(400).json({ message: 'Invalid combinedData' });
    }

    // Create new feedback document
    const { job_id, invitation_id } = combinedData;
    const newFeedback = new Feedback({ rating, feedback, userId, job_id, invitation_id });

    // Save the new feedback document to the database
    const savedFeedback = await newFeedback.save();

    // Respond with the saved feedback
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error); // Log the error for debugging
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