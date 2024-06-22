const mongoose = require('mongoose');
const addwishlistSchema = new mongoose.Schema({
job_invitation_id :{
        type: String,
        required: true
},
job_id:{
    type: String,
    required: true
},
candidate_id:{
    type: String,
    required: true
},
candidate_email:{
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now
},
submitted : {
    type: Boolean,
    default:false
}

}, {timestamps: true});
const Addwishlistmodel = mongoose.model('Addwishlist', addwishlistSchema);
module.exports = Addwishlistmodel;