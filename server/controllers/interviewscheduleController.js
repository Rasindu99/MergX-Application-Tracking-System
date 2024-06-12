const InterviewSchedule = require('../models/interviewSchedule');

// Post interview schedule
const createInterviewSchedule = async (req, res) => {
    try {
        const { jobId, creatorId, date, start_time, end_time, subject, link, password } = req.body;
        
        if (!jobId || !creatorId || !date || !start_time || !end_time || !subject || !link || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create interview schedule in the database
        const interviewschedule = await InterviewSchedule.create({
            jobId,
            creatorId,
            date,
            start_time,
            end_time,
            subject,
            link,
            password
        });
        return res.status(200).json({ message: 'Interview Schedule created successfully', interviewschedule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Get interview schedules
const getInterviewSchedules = async (req, res) => {
    try {
        const { jobId } = req.query;

        // Optionally filter by jobId if provided
        const filter = jobId ? { jobId } : {};

        // Retrieve interview schedules from the database
        const interviewschedules = await InterviewSchedule.find(filter);

        return res.status(200).json(interviewschedules);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createInterviewSchedule,
    getInterviewSchedules
};
