const Evaluationmodel = require('../models/evaluation')
const User =  require('../models/user');
const JobPosting =require('../models/jobposting');
// Post evaluation

const createEvalautions = async (req,res)=>{
    try{
        const {candidatename,candidateid,candidateemail,position,job_id,interviewername,interviewerid,problemsolution,languageproficiency,interviewercomments,addcomment,collaboration,adoptability,decisionmaking,leadership,clarity,activelistening,empathy,presentationskills,technical,cultural,communication,overallcomment} = req.body;
        if(!candidatename || !candidateid || !candidateemail || !position || !interviewername || !interviewerid || !problemsolution || !languageproficiency || !interviewercomments || !addcomment || !collaboration || !adoptability || !decisionmaking || !leadership || !clarity || !activelistening || !empathy || !presentationskills || !technical || !cultural || !communication || !overallcomment){
           return res.status(400).json({error:'Missing required fields'})
        };
        const evaluation = await Evaluationmodel.create({
            candidatename,
            candidateid,
            candidateemail,
            position,
            job_id,
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
            overallcomment,
            
        });
        return res.status(200).json({message:'Evaluation created successfully',evaluation});
       
      
    } catch(error){
            console.error(error);
            return res.status(500).json({
                error:'Server Error'
            })
        }
}


const getImage = async (req, res) => {
 const { _id } = req.params;
  if (!_id) {
    return res.status(400).json({ error: 'candidateid query parameter is required' });
  }

  try {
    const candidate = await User.findOne({_id},{image:1});
    if (!candidate) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

const getPost =  async(req,res)=>{
  const { _id } =req.params;
  if (!_id) {
    return res.status(400).json({ error: 'jobid query parameter is required' });
  }

  try {
    const job = await jobposting.findOne({ _id },{jobTitle:1});
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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

const getEvaluation = async (req, res) => {
  const { candidateid, position } = req.query;
  if (!candidateid || !position) {
    return res.status(400).json({ error: 'Both candidateid and position query parameters are required' });
  }

  try {
    const evaluation = await Evaluationmodel.findOne({ candidateid, position });
    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }
    res.json(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({ error: 'Server error' });
  }
}




const getEvaCandidates = async (req,res)=>{
  try{
    const candidates = await Evaluationmodel.find();
    if(!candidates){
      return res.status(404).json({error:'Candidates not found'});
    }
    res.json(candidates);
  }
  catch(error){
    console.error('Error in getEvaCandidates:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
}


const getimg = async (req, res) => {
  const { _id } = req.params; // Extracting _id from path parameters

  if (!_id) {
    return res.status(400).json({ error: 'user_id path parameter is required' });
  }

  try {
    const candidate = await User.findOne({ _id }, { image: 1 });
    if (!candidate) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(candidate);
  } catch (error) {
    console.error('Error in getimg:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

const getpost = async  (req,res)=>{
  const _id = req.params;
  
  if(!_id){
    return res.status(400).json({ error: 'job_id path parameter is required' });
  }
  try{
    const jobPost = await JobPosting.findOne({ _id }, { jobTitle: 1 });
    if (!jobPost) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(jobPost);

  }catch (error) {
    console.error('Error in getimg:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports={
  createEvalautions,
    // updateEvaluation,
    getEvaluation,
    getimg,
    getpost,
    getEvaCandidates
}