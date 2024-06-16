const Evalationmodel = require('../models/evaluation')

// Post evaluation

const createEvalautions = async (req,res)=>{
    try{
        const {candidatename,candidateid,candidateemail,interviewername,interviewerid,problemsolution,languageproficiency,interviewercomments,addcomment,collaboration,adoptability,decisionmaking,leadership,clarity,activelistening,empathy,presentationskills,technical,cultural,communication,overallcomment} = req.body;
        if(!candidatename || !candidateid || !candidateemail || !interviewername || !interviewerid || !problemsolution || !languageproficiency || !interviewercomments || !addcomment || !collaboration || !adoptability || !decisionmaking || !leadership || !clarity || !activelistening || !empathy || !presentationskills || !technical || !cultural || !communication || !overallcomment){
           return res.status(400).json({error:'Missing required fields'})
        };
        const evaluation = await Evaluationmodel.create({
            candidatename,
            candidateid,
            candidateemail,
            interviewername,
            interviewerid,
            problemsolution,
            languageproficiency,
            interviewercomments,
            addcomment,
            collaboration,
            adoptability,
            decisionmaking,
            leadership,
            clarity,
            activelistening,
            empathy,
            presentationskills,
            technical,
            cultural,
            communication,
            overallcomment
        });
        return res.status(200).jsoon({message:'Evaluation created successfully',evaluation});
       
      
    } catch(error){
            console.error(error);
            return res.status(500).json({
                error:'Server Error'
            })
        }
}
module.exports={
    createEvalautions
}