const mongoose = require('mongoose');

// Define the Interview schema
const interviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the Interview model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;