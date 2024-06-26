const mongoose= require('mongoose');
const evaluationSchema = new mongoose.Schema({
    candidatename:{
        type: String,
        required : true
    },
    candidateid :{
        type: String,
        required : true
    },
    candidateemail:{
        type: String,
        required : true
    },
    position:{
        type: String,
        required : true

    },
    interviewername:{
        type: String,
        required : true
    },
    interviewerid:{
        type: String,
        required : true
    },

    //Technical Details
    problemsolution:{
        type:Number,
        required : true
    },
    languageproficiency:{
        type:Number,
        required : true
    },
    interviewercomments:{
        type:String,
        required : true
    },

    //culturalfit
    addcomment:{
        type:Number,
        required : true
    },
    collaboration:{
        type:Number,
        required : true
    },
    adoptability:{
        type:Number,
        required : true
    },
    decisionmaking:{
        type:Number,
        required : true
    },
    leadership:{
        type:Number,
        required : true
    },

    //communication

    clarity:{
        type:Number,
        required : true
    },
    activelistening:{
        type:Number,
        required : true
    },
    empathy:{
        type:Number,
        required : true
    },
    presentationskills:{
        type:Number,
        required : true
    },

    //Overall
    technical:{
        type:Number,
        required : true
    },
    cultural:{
        type:Number,
        required : true
    },
    communication:{
        type:Number,
        required : true
    },
    overallcomment:{
        type:String,
        required : true
    },
    
    // fill by hiringmanager
    hiringManagerComment:{
        type:String,
        default:' '
    },

    // fill by recruiter
    recruiterComment:{
        type:String,
        default:' '
    },

    //fill by Hiring manager
    isHired:{
        type:Boolean,
        default:false
    },

})
const Evaluationmodel= mongoose.model('evaluation',evaluationSchema);
module.exports= Evaluationmodel;