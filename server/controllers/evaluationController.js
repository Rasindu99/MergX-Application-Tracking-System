const Evaluationmodel = require('../models/evaluation')

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
        return res.status(200).json({message:'Evaluation created successfully',evaluation});
       
      
    } catch(error){
            console.error(error);
            return res.status(500).json({
                error:'Server Error'
            })
        }
}

const updateEvaluation = async (req,res)=>{
    try{
        const { _id } = req.params;
        const {candidatename,candidateid,candidateemail,interviewername,interviewerid,problemsolution,languageproficiency,interviewercomments,addcomment,collaboration,adoptability,decisionmaking,leadership,clarity,activelistening,empathy,presentationskills,technical,cultural,communication,overallcomment} = req.body;
        if(!candidatename || !candidateid || !candidateemail || !interviewername || !interviewerid || !problemsolution || !languageproficiency || !interviewercomments || !addcomment || !collaboration || !adoptability || !decisionmaking || !leadership || !clarity || !activelistening || !empathy || !presentationskills || !technical || !cultural || !communication || !overallcomment){
           return res.status(400).json({error:'Missing required fields'})
        };
        const evaluation = await Evaluationmodel.findByIdAndUpdate(
            _id,
            {
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
            },
            { new: true } // To return the updated document
          );
        return res.status(200).json({message:'Evaluation updated successfully',evaluation});
       
      
    } catch(error){
            console.error(error);
            return res.status(500).json({
                error:'Server Error'
            })
        }
}

const getEvaluation = async (req,res)=>{
    
    const { candidateid } = req.query;
  if (!candidateid) {
    return res.status(400).json({ error: 'candidateid query parameter is required' });
  }

  try {
    const evaluation = await Evaluationmodel.findOne({ candidateid });
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

}
module.exports={
    createEvalautions,
    updateEvaluation,
    getEvaluation
}