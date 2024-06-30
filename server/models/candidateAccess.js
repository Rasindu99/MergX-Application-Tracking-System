const mongoose = require('mongoose');
const candidateaccessSchema = new mongoose.Schema({

    assistance_chatbot: {
        type:Boolean,
        default:true
    },
    ai_chatbot: {
        type:Boolean,
        default:true
    },
    edit_profile: {
        type:Boolean,
        default:true
    },
    view_status: {
        type:Boolean,
        default:true
    },
    view_announcement: {
        type:Boolean,
        default:true
    },
    add_wishlist: {
        type:Boolean,
        default:true
    },
    upload_cv: {
        type:Boolean,
        default:true
    },
    join_interviews: {
        type:Boolean,
        default:true
    }

});
const Candidateaccessmodel = mongoose.model('Candidateaccess', candidateaccessSchema);
module.exports = Candidateaccessmodel;