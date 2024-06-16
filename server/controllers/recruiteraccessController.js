const Recruiteraccessmodel = require('../models/recruiterAccess');

//post database
const postrecruiteraccess = async (req, res) => {
    try {
        const { create_job_post, create_status, create_announcement, send_invitation } = req.body;

        // Check for the presence of required fields
        if (typeof create_job_post !== 'boolean' || typeof create_status !== 'boolean' || 
            typeof create_announcement !== 'boolean' || typeof send_invitation !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const recruiterAccess = await Recruiteraccessmodel.create({
            create_job_post, 
            create_status, 
            create_announcement,
            send_invitation 
        });

        return res.status(201).json({ message: 'Updated successfully', recruiterAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    postrecruiteraccess
}