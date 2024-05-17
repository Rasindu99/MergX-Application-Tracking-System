const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({

    user_fname:{
        type: String,
    },
    user_lname:{
        type: String,
    },
    user_email:{
        type: String,
    },
    time:{
        type: String,
    },

    title:{
        type: String,
        require:true,
    },
    
    announce:{
        type: String,
        require:true,
    } 

});
const Announcementmodel = mongoose.model('Announcement', announcementSchema);
module.exports = Announcementmodel;