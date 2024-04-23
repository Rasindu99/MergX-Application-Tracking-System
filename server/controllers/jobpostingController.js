const JobPosting = require('../models/jobposting');

const jobtest = (req, res) => {
    res.json('test is working superbly');
};

const jobposting = async (req, res) => {
    try {
        const { jobTitle, vacancies, description, salary, requiredExperience, requiredSkills, approved } = req.body;
        
        // Check if required fields are provided
        if (!jobTitle || !salary || !requiredExperience) {
            return res.status(400).json({
                error: 'job title, salary, and required experience are required'
            });
        }

        // Create a new job posting
        const jobPosting = await JobPosting.create({
            jobTitle,
            vacancies,
            description,
            salary,
            requiredExperience,
            requiredSkills,
            approved
        });
        
        // Return the created job posting
        return res.status(201).json(jobPosting);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    jobtest,
    jobposting
};
