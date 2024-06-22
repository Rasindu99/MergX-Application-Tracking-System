const Application = require('../models/application');

const uploadApplication = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Assuming req.body contains other necessary fields like invitation_id, job_id, etc.
        const { invitation_id, job_id, user_id, user_name, user_email, approval } = req.body;

        // Get the file key from S3 upload (assuming you are using AWS S3 based on previous discussions)
        const cv = req.file.key;

        // Create new application instance
        const newApplication = new Application({
            invitation_id,
            job_id,
            user_id,
            user_name,
            user_email,
            cv,
            approval
        });

        // Save the application to the database
        await newApplication.save();

        res.status(201).json({ message: 'Application uploaded successfully', application: newApplication });
    } catch (error) {
        console.error('Error in uploading application:', error);
        res.status(500).json({ message: 'Failed to upload application' });
    }
};

module.exports = {
    uploadApplication
};
