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

// const updateEvaluation =  async (req, res) => {
//   try {
//     const  _id  = req.params._id.trim();
//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//       return res.status(400).json({ error: 'Invalid _id format' });
//     }
//     const updateFields = {
//       candidatename: req.body.candidatename,
//       candidateid: req.body.candidateid,
//       candidateemail: req.body.candidateemail,
//       interviewername: req.body.interviewername,
//       interviewerid: req.body.interviewerid,
//       problemsolution: req.body.problemsolution,
//       languageproficiency: req.body.languageproficiency,
//       interviewercomments: req.body.interviewercomments,
//       addcomment: req.body.addcomment,
//       collaboration: req.body.collaboration,
//       adoptability: req.body.adoptability,
//       decisionmaking: req.body.decisionmaking,
//       leadership: req.body.leadership,
//       clarity: req.body.clarity,
//       activelistening: req.body.activelistening,
//       empathy: req.body.empathy,
//       presentationskills: req.body.presentationskills,
//       technical: req.body.technical,
//       cultural: req.body.cultural,
//       communication: req.body.communication,
//       overallcomment: req.body.overallcomment
//     };

//     // Check for missing required fields
//     const requiredFields = Object.keys(updateFields).filter(field => !updateFields[field]);
//     if (requiredFields.length > 0) {
//       return res.status(400).json({ error: `Missing required fields: ${requiredFields.join(', ')}` });
//     }

//     const evaluation = await Evaluationmodel.findByIdAndUpdate(
//       _id,
//       updateFields,
//       { new: true } // To return the updated document
//     );

//     if (!evaluation) {
//       return res.status(404).json({ error: 'Evaluation not found' });
//     }

//     return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
//   } catch (error) {
//     console.error('Error updating evaluation:', error);
//     return res.status(500).json({ error: 'Server Error' });
//   }
// }

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
    // updateEvaluation,
    getEvaluation
}