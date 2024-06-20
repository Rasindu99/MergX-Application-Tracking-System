const mongoose = require('mongoose');
const adminaccessSchema = new mongoose.Schema({

    create_user_account: {
        type:Boolean,
        default:true
    },
    modify_user_account:{
        type:Boolean,
        default:true
    },
    role_update:{
        type:Boolean,
        default:true
    },
    delete_user_account:{
        type:Boolean,
        default:true
    }

});
const Adminaccessmodel = mongoose.model('Adminaccess',adminaccessSchema);
module.exports = Adminaccessmodel;