
const JobPosting = require('../models/jobposting');
const EvaluationModel = require('../models/evaluation');
const InterviewSchedule = require('../models/interviewSchedule');
const User = require('../models/user');

const getEvaluationCount = async (req, res) => {
    try{
        const count = await EvaluationModel.countDocuments({});
        res.status(200).json({total: count});
    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }

}

const getTotalJobPostings = async (req, res)=>{
    try{
        const count = await JobPosting.countDocuments({approved:true});
        res.status(200).json({jobpostingcount: count});
    }catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }
}

const getTotalPendingJobs = async (req, res)=>{
    try{
        const count = await JobPosting.countDocuments({approved:false});
        res.status(200).json({pendingjobpostingcount: count});
    }catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }
}

const getcandidatecount = async (req,res)=>{
    try{
        const count = await User.countDocuments({role:'candidate'});
        res.status(200).json({candidatecount: count});

    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    
    }
}

const getTotalVacancies = async (req,res )=>{
    try {
        const result = await JobPosting.aggregate([
          {
            $group: {
              _id: null, // No grouping by any field, we just want the total sum
              totalVacancies: { $sum: "$vacancies" }
            }
          }
        ]);
    
        const totalVacancies = result.length > 0 ? result[0].totalVacancies : 0;
        res.status(200).json({ totalVacancies });
      } catch (error) {
        res.status(500).json({ error: 'Error during aggregation', details: error });
      }
}



module.exports ={
    getTotalJobPostings,
    getTotalPendingJobs,
    getcandidatecount,
    getTotalVacancies,
    getEvaluationCount
}