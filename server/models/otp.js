const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    user_phone_number: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        expires: 180  // TTL index to auto-delete documents after 3 minutes
    }
});
const Otpmodel = mongoose.model('Otp', otpSchema);
module.exports = Otpmodel;