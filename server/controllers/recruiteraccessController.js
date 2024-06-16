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


// GET create_user_account
const getCreateUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ create_user_account: adminAccess.create_user_account });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get modify access
const getModifyUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ modify_user_account: adminAccess.modify_user_account });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get role update access
const getupdateRole = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({role_update: adminAccess.role_update });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get user delete access
const getDeleteUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({delete_user_account: adminAccess.delete_user_account });
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
    putSendInvitation
}