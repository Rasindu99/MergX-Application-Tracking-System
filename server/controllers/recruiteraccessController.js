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
};


//put create_job_post
const putCreateJobPost = async (req, res) => {
    try {
        const {create_job_post } = req.body;

        if (typeof create_job_post !== 'boolean') {
            return res.status(400).json({ error: 'Invalid create_job_post value' });
        }

        const updatedRecruiterAccess = await Recruiteraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { create_job_post },
            { new: true, useFindAndModify: false }
        );

        if (!updatedRecruiterAccess) {
            return res.status(404).json({ error: 'recruiter access settings not found' });
        }

        return res.status(200).json({ message: 'user delete access updated successfully',updatedRecruiterAccess  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put status create accesss
const putStatusCreate = async (req, res) => {
    try {
        const { create_status } = req.body;

        if (typeof create_status !== 'boolean') {
            return res.status(400).json({ error: 'Invalid create_status value' });
        }

        const updatedRecruiterAccess = await Recruiteraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { create_status },
            { new: true, useFindAndModify: false }
        );

        if (!updatedRecruiterAccess) {
            return res.status(404).json({ error: 'recruiter access settings not found' });
        }

        return res.status(200).json({ message: 'user delete access updated successfully',updatedRecruiterAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put create announcement access
const putCreateAnnouncement = async(req,res) => {
    try {
        const {create_announcement } = req.body;

        if (typeof create_announcement !== 'boolean') {
            return res.status(400).json({ error: 'Invalid create_announcement access value' });
        }

        const updatedRecruiterAccess = await Recruiteraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { create_announcement },
            { new: true, useFindAndModify: false }
        );

        if (!updatedRecruiterAccess) {
            return res.status(404).json({ error: 'recruiter access settings not found' });
        }

        return res.status(200).json({ message: 'user delete access updated successfully', updatedRecruiterAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put send job invitation
const putSendInvitation = async(req, res) => {
    try {
        const {send_invitation } = req.body;

        if (typeof send_invitation !== 'boolean') {
            return res.status(400).json({ error: 'Invalid user delete access value' });
        }

        const updatedRecruiterAccess = await Recruiteraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { send_invitation },
            { new: true, useFindAndModify: false }
        );

        if (!updatedRecruiterAccess) {
            return res.status(404).json({ error: 'recruiter access settings not found' });
        }

        return res.status(200).json({ message: 'user delete access updated successfully',updatedRecruiterAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}


// GET create_job_post access
const getCreatejobpost = async (req, res) => {
    try {
        const recruiterAccess = await Recruiteraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!recruiterAccess) {
            return res.status(404).json({ error: 'Recruiter access settings not found' });
        }

        return res.status(200).json({ create_job_post: recruiterAccess.create_job_post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get create stts access
const getStatusCreate = async (req, res) => {
    try {
        const recruiterAccess = await Recruiteraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!recruiterAccess) {
            return res.status(404).json({ error: 'Recruiter access settings not found' });
        }

        return res.status(200).json({ create_status: recruiterAccess.create_status });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get access anouncement
const getCreateAnnouncement = async (req, res) => {
    try {
        const recruiterAccess = await Recruiteraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!recruiterAccess) {
            return res.status(404).json({ error: 'Recruiter access settings not found' });
        }

        return res.status(200).json({ create_announcement: recruiterAccess.create_announcement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get access send invitation
const getSendInvitation = async (req, res) => {
    try {
        const recruiterAccess = await Recruiteraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!recruiterAccess) {
            return res.status(404).json({ error: 'Recruiter access settings not found' });
        }

        return res.status(200).json({ send_invitation: recruiterAccess.send_invitation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    postrecruiteraccess,
    putCreateJobPost,
    putStatusCreate,
    putCreateAnnouncement,
    putSendInvitation,

    getCreatejobpost,
    getStatusCreate,
    getCreateAnnouncement,
    getSendInvitation
}