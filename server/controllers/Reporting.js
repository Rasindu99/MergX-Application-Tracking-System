const EvaluationModel = require('../models/evaluation');
const Application = require('../models/application');
const JobPosting = require('../models/jobposting');


// total hired count
const getAllHiredCount = async (req, res) => {
    try {
        const count = await EvaluationModel.countDocuments({ isHired: true });
        res.status(200).json({ hiredcount: count });
    } catch (err) {
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
};

// hired count by position
const getHiredCountByPosition = async (req, res) => {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
        // const results = await EvaluationModel.aggregate([
        //     { $match: { isHired: true, job_id: jobId } },
        //     { $group: { _id: '$job_id', position: { $first: '$position' }, count: { $sum: 1 } } }
        // ]);
        // res.json(results);
        const count = await EvaluationModel.countDocuments({ job_id: jobId, isHired: true });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ error: 'Error during aggregation', details: err });
    }
};

// total evaluations count


const getTotalEvaluationsCount = async (req, res) => {
    try {
        const count = await EvaluationModel.countDocuments({});
        res.json({ total: count });
    } catch (err) {
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
};

// interview faced evaluations count by position

// const getTotalEvaluationsCountByPosition = async (req, res) => {
//     const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
//     try {
//         const results = await EvaluationModel.aggregate([
//             { $match: { job_id: jobId } },
//             { $group: { _id: '$job_id', position: { $first: '$position' }, count: { $sum: 1 } } }
//         ]);
//         res.json(results);
//     } catch (err) {
//         res.status(500).json({ error: 'Error during aggregation', details: err });
//     }
// };
const getTotalEvaluationsCountByPosition = async (req, res) => {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
        // const results = await EvaluationModel.aggregate([
        //     { $match: { job_id: jobId } },
        //     { $group: { _id: '$job_id', count: { $sum: 1 } } }
        // ]);
        const count = await EvaluationModel.countDocuments({ job_id: jobId});
        res.status(200).json({ count });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error during aggregation', details: err });
    }
};


// total submitted applications count

const getAllApplicationCount = async(req,res)=>{
    try{
        const count = await Application.countDocuments({});
        res.status(200).json({ total: count });
    }catch(err){
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
  }

//   count of submitted applications by job_id


const getAllApplicationCountByJobId = async (req, res) => {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
        // const results = await Application.aggregate([
        //     { $match: { job_id: jobId } },
        //     { $group: { _id: '$job_id', count: { $sum: 1 } } }
        // ]);
        // res.status(200).json(results);
        const count = await Application.countDocuments({ job_id: jobId});
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ error: 'Error during aggregation', details: err });
    }
};
// Total accepted applications

const getAllAcceptedApplicationCount = async (req, res) => {
    try {
        const count = await Application.countDocuments({ approval: true });
        res.status(200).json({ total: count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
};


// count of accepted applications by position

const getTotalAcceptedApplicationsByPosition = async (req, res) => {
    const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
    try {
        // const results = await Application.aggregate([
        //     { $match: { job_id: jobId, approval: true } },
        //     { $group: { _id: '$job_id', count: { $sum: 1 } } }
        // ]);
        // res.status(200).json(results);
        const count = await Application.countDocuments({ job_id: jobId,approval: true });
        res.status(200).json({ count });
        
    } catch (err) {
        res.status(500).json({ error: 'Error during aggregation', details: err });
    }
};

// get job details by job_id

const getJobDetails = async (req, res) => {
    const { jobid } = req.params; // Assuming jobid is passed as a URL parameter
    try {
        const job = await JobPosting.findOne({ _id: jobid }, 'salary vacancies createdAt updatedAt');
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching job details', details: err });
    }
};

// get all job id with jobTitle

const getAllApprovedJobPostingsId = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ approved: true })
            .sort({ updatedAt: -1 })
            .select('_id jobTitle');

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No approved job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


  

module.exports = {
    getAllHiredCount,
    getHiredCountByPosition,
    getTotalEvaluationsCount,
    getAllApplicationCount,
    getTotalEvaluationsCountByPosition,
    getAllApplicationCountByJobId,
    getJobDetails,
    getTotalAcceptedApplicationsByPosition,
    getAllApprovedJobPostingsId,
    getAllAcceptedApplicationCount
};
