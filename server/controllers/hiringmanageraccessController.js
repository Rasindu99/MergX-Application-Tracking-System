const Hiringmanageraccessmodel =  require('../models/hiringManagerAccess');

//postmethod
const postaccesshiringmanager = async (req, res) => {
    try {
        const { job_approval, view_feedback, make_decision } = req.body;

        // Check required fields
        if (typeof job_approval !== 'boolean' || typeof view_feedback !== 'boolean' || typeof make_decision !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const hiringManagerAccess = await Hiringmanageraccessmodel.create({
            job_approval,
            view_feedback,
            make_decision
        });

        // Send a response back to the client
        return res.status(201).json({ message: 'Access settings created successfully', data: hiringManagerAccess });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    postaccesshiringmanager,
}