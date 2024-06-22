const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    invitation_id: {
        type: String,
        required: true
    },
    job_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    approval: {
        type: Boolean,
        default:false
    },
    rejected:{
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isjoined:{
        type:Boolean,
        default: false
    }
});

const Applicationmodel = mongoose.model('Application', applicationSchema);
module.exports = Applicationmodel;
