const mongoose = require('mongoose');

const interviewScheduleSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    skills:{
        type: String,
        required: true 
    },
    description:{
        type:String,
        required: true
    }
});

const InterviewSchedule = mongoose.model('InterviewSchedule', interviewScheduleSchema);
module.exports = InterviewSchedule;
