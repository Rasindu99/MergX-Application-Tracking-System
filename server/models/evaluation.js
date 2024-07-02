const mongoose = require('mongoose');

// Update evaluationSchema to include a reference to applicationSchema
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
    job_id:{
        type: String,
        default:''
    },
    interviewername:{
        type: String,
        required : true
    },
    interviewerid:{
        type: String,
        required : true
    },

    // Technical Details
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

    // Cultural Fit
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

    // Communication
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

    // Overall
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
    
    // Fill by Hiring Manager
    hiringManagerComment:{
        type:String,
        default:' '
    },

    // Fill by Recruiter
    recruiterComment:{
        type:String,
        default:' '
    },

    // Fill by Hiring Manager
    isHired:{
        type:Boolean,
        default:false
    },

    
});

const Evaluationmodel = mongoose.model('Evaluation', evaluationSchema);
module.exports = Evaluationmodel;
