const Evaluationmodel = require('../models/evaluation')

const getEvolution= async(req,res)=>{
    try{
       const evaluation = await Evaluationmodel.findByIdAndUpdate(_id, updateFields, { new: true });
        if(!evaluation){
            return res.status(404).json({error:'Evaluation not found'})
        }
        return res.status(200).json({message:'Evaluation fetched successfully',evaluation});
    }
    catch(error){
        console.error('Error getting evaluation:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
}

// const updateEvaluation = async (req, res) => {
//     try {
//         const  _id  = req.params._id.trim();
//         if (!mongoose.Types.ObjectId.isValid(_id)) {
//           return res.status(400).json({ error: 'Invalid _id format' });
//         }
//         const updateFields = {
//           candidatename: req.body.candidatename,
//           candidateid: req.body.candidateid,
//           candidateemail: req.body.candidateemail,
//           interviewername: req.body.interviewername,
//           interviewerid: req.body.interviewerid,
//           problemsolution: req.body.problemsolution,
//           languageproficiency: req.body.languageproficiency,
//           interviewercomments: req.body.interviewercomments,
//           addcomment: req.body.addcomment,
//           collaboration: req.body.collaboration,
//           adoptability: req.body.adoptability,
//           decisionmaking: req.body.decisionmaking,
//           leadership: req.body.leadership,
//           clarity: req.body.clarity,
//           activelistening: req.body.activelistening,
//           empathy: req.body.empathy,
//           presentationskills: req.body.presentationskills,
//           technical: req.body.technical,
//           cultural: req.body.cultural,
//           communication: req.body.communication,
//           overallcomment: req.body.overallcomment,
//           hiringManagerComment: req.body.hiringManagerComment,
//         recruiterComment:req.body.recruiterComment,
//         isHired:req.body.isHired
//         };
        
    
//         const evaluation = await Evaluationmodel.findByIdAndUpdate(
//           _id,
//           updateFields,
//           { new: true } // To return the updated document
//         );
    
//         if (!evaluation) {
//           return res.status(404).json({ error: 'Evaluation not found' });
//         }
    
//         return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
//       } catch (error) {
//         console.error('Error updating evaluation:', error);
//         return res.status(500).json({ error: 'Server Error' });
//       }
//   };

module.exports = {
    getEvolution,
    
}


