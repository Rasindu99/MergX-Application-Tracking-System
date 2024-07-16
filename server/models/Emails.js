const mongoose = require('mongoose');
const emailSchema = new mongoose.Schema({
    to:[{
        type: String,
        required: true
    }],
    subject:{
        type: String,
        required: true
    },
    body:{
        type: String
    },
    file:{
        type: String
    }

}, {timestamps:true});
const Emailmodel = mongoose.model('Email',emailSchema);
module.exports = Emailmodel;