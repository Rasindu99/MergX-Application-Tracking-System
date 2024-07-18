const JobPosting = require('../models/jobposting');
const InterviewSchedule = require('../models/interviewSchedule');


const jobtest = (req, res) => {
    res.json('test is working superbly');
};

//POST a new jobposting
const createJobPosting = async (req, res) => {
    try {
        const { jobCreatorId, jobcreatorEmail, jobTitle, vacancies, description, salary, requiredExperience, requiredSkills, approved } = req.body;

        if (!jobTitle || !salary || !requiredExperience) {
            return res.status(400).json({
                error: 'job title, salary, and required experience are required'
            });
        }

        const lastJobPosting = await JobPosting.findOne().sort({ jobid: -1 });

        const lastJobId = lastJobPosting && typeof lastJobPosting.jobid === 'number' ? lastJobPosting.jobid : 0;

        const newJobId = lastJobId + 1;

        if (isNaN(newJobId)) {
            throw new Error('Failed to generate a valid job ID');
        }

        const jobPosting = await JobPosting.create({
            jobid: newJobId,
            jobCreatorId,
            jobcreatorEmail,
            jobTitle,
            vacancies,
            description,
            salary,
            requiredExperience,
            requiredSkills,
        });

        return res.status(201).json(jobPosting);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

//GET all pending job postings
const getAllPendingJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ pending: true }).sort({ updatedAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No pending job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// GET all approved job postings
const getAllApprovedJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ approved: true}).sort({ approvedAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No approved job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// GET all approved and nonscheduled job postings
const getNonScheduledJobPostings = async (req, res) => {
    try {
        const approvedJobPostings = await JobPosting.find({ approved: true }).sort({ approvedAt: -1 }).lean();

        if (!approvedJobPostings || approvedJobPostings.length === 0) {
            return res.status(404).json({ message: "No approved job postings found" });
        }

        const scheduledJobIds = await InterviewSchedule.find({ send: true }).distinct('jobId');

        const unscheduledJobPostings = approvedJobPostings.filter(job => 
            !scheduledJobIds.includes(job._id.toString())
        );

        if (!unscheduledJobPostings.length) {
            return res.status(404).json({ message: "No approved job postings without interview schedules found" });
        }

        return res.status(200).json(unscheduledJobPostings);
    } catch (error) {
        console.error('Error fetching approved job postings without interview schedules:', error);
        return res.status(500).json({ message: error.message });
    }
};

//GET all approved and scheduled job postings
const getScheduledJobPostings = async (req, res) => {
    try {
        //Find all approved job postings
        const jobPostings = await JobPosting.find({ approved: true }).lean();

        //Retrieve interview schedules with send: true and sort by updatedAt descending
        const interviewSchedules = await InterviewSchedule.find({ send: true }).sort({ updatedAt: -1 }).lean();

        //Create a map of jobId to schedule updatedAt
        const jobIdToScheduleMap = new Map();
        interviewSchedules.forEach(schedule => {
            jobIdToScheduleMap.set(schedule.jobId.toString(), schedule.updatedAt);
        });

        //Filter the approved job postings to include only those that have a scheduled interview
        const scheduledJobs = jobPostings.filter(job => 
            jobIdToScheduleMap.has(job._id.toString())
        );

        //Sort the filtered job postings by the updatedAt of their respective schedules
        scheduledJobs.sort((a, b) => {
            const aUpdatedAt = jobIdToScheduleMap.get(a._id.toString());
            const bUpdatedAt = jobIdToScheduleMap.get(b._id.toString());
            return bUpdatedAt - aUpdatedAt;
        });

        if (!scheduledJobs.length) {
            return res.status(404).json({ message: "No scheduled job postings found" });
        }

        return res.status(200).json(scheduledJobs);
    } catch (error) {
        console.error('Error fetching scheduled job postings:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


//GET all rejected job postings
const getAllRejectedJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ rejected: true }).sort({ createdAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No rejected job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

//UPDATE a job post
const updateJobPosting = async(req, res) =>{
    const jobId = req.params.id;
    const updatedJob = req.body;

    try {

        const job = await JobPosting.findByIdAndUpdate(jobId, updatedJob, { new: true });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job); 
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job post.' });
    }
}

//DELETE a job post
const deleteJobPosting = async(req, res) => {
    const jobId = req.params.id;

  try {
    const deletedJob = await JobPosting.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {

    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job. Please try again later.' });
  }
}

//UPDATE expired tag
const updateExpiredStatus = async(req,res) => {
    const jobId = req.params.id;
  const { expired } = req.body;

  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(jobId, { expired }, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job expired status updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Error updating job expired status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

//GET expire = false jobs
const getNotExpiredJobposting = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ 
            expired: false, 
            approved: true 
        }).sort({ createdAt: -1 });

        if (jobPostings.length === 0) {
            return res.status(404).json({ message: "No active job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.error('Error fetching non-expired job postings:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//UPDATE approve=true
const approveJobPosting = async (req, res) => {
    const jobId = req.params.id;
    const { approved } = req.body;

    try {
        const updateData = { 
            approved, 
            pending: false, 
        };

        if (approved) {
            updateData.approvedAt = new Date();
        }

        const updatedJob = await JobPosting.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, message: 'Job approved successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job approved:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


//UPDATE reject=true
const rejectJobPosting = async (req, res) => {
    const jobId = req.params.id;
    const { rejected, improvements } = req.body;

    try {
        const updateData = { 
            rejected, 
            improvements,
            pending: false, 
        };

        const job = await JobPosting.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error rejecting job:', error);
        res.status(500).json({ message: 'Failed to reject job.' });
    }
}



module.exports = {
    jobtest,
    createJobPosting,
    getAllPendingJobPostings,
    getAllApprovedJobPostings,
    getNonScheduledJobPostings,
    getScheduledJobPostings,
    getAllRejectedJobPostings,
    updateJobPosting,
    deleteJobPosting,
    updateExpiredStatus,
    getNotExpiredJobposting,
    approveJobPosting,
    rejectJobPosting
};
