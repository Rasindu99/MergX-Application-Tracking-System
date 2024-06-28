const mongoose = require('mongoose');
const intervieweraccessSchema = new mongoose.Schema({
    interview_scheduling : {

    },
    join_interview : {

    },
    Submit_evaluation : {

    },
    feedback_submission : {

    }
});
const Intervieweraccessmodel = mongoose.model('Intervieweraccess', intervieweraccessSchema);
module.exports = Intervieweraccessmodel