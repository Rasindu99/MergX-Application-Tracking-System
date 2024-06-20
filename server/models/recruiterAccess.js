const mongoose = require('mongoose');
const recruiteraccessSchema = new mongoose.Schema({

    create_job_post:{
        type:Boolean,
        default:true
    },
    create_status:{
        type:Boolean,
        default:true
    },
    create_announcement:{
        type:Boolean,
        default:true
    },
    send_invitation:{
        type:Boolean,
        default:true
    }
});
const Recruiteraccessmodel = mongoose.model('Recruiteraccess', recruiteraccessSchema);
module.exports = Recruiteraccessmodel