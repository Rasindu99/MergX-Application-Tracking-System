const mongoose = require('mongoose');
const intervieweraccessSchema = new mongoose.Schema({
    interview_scheduling : {
        type:Boolean,
        default:true
    },
    join_interview : {
        type:Boolean,
        default:true
    },
    submit_evaluation : {
        type:Boolean,
        default:true
    },
    feedback_submission : {
        type:Boolean,
        default:true
    }
});
const Intervieweraccessmodel = mongoose.model('Intervieweraccess', intervieweraccessSchema);
module.exports = Intervieweraccessmodel