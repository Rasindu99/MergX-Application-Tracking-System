const mongoose = require('mongoose');
const eveluationSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    candidate :{
        type: String,
        required : true
    }

});
const Evaluationmodel = mongoose.model('evaluation', eveluationSchema);
module.exports = Evaluationmodel;