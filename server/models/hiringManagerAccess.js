const mongoose = require('mongoose');
const hiringmanageraccessSchema = new mongoose.Schema({

    job_approval :{
        type:Boolean,
        default:true
    },
    view_feedback:{
        type:Boolean,
        default:true
    },
    make_decision:{
        type:Boolean,
        default:true
    }
});
const Hiringmanageraccessmodel = mongoose.model('Hiringmanageraccess', hiringmanageraccessSchema);
module.exports = Hiringmanageraccessmodel;