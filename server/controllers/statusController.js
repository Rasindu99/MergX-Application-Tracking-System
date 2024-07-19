const Status = require('../models/status');

const statusset = (req, res) => {
    res.json('test is working');
};

// Function to delete status after 6 hours
const deleteStatus = async (statusId) => {
    try {
       

        // Find and delete the status
        await Status.findByIdAndDelete(statusId);
        console.log('Status deleted successfully');
    } catch (error) {
        console.error('Error deleting status:', error);
    }
};

// Status post endpoint
const updatestatus = async (req, res) => {
    try {
        const { user_id, user_fname, user_lname, user_email, time, image, description } = req.body;

        if (!user_id || !user_fname || !user_lname || !user_email || !time || !image || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create status in database
        const status = await Status.create({
            user_id,
            user_fname,
            user_lname,
            user_email,
            time,
            image,
            description,
        });

        // Schedule deletion of status after 6 hours
        setTimeout(() => {
            deleteStatus(status._id); // Call deleteStatus function after 6 hours
        },  60 * 1000 ); // 30mins in milliseconds

        return res.status(200).json({ message: 'Status updated successfully', status });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get status

const getstatus = async (req, res) => {
    try {
        // Retrieve all statuses from the database
        const statuses = await Status.find();
        return res.status(200).json(statuses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to handle delete status request
const deleteStatuses = async (req, res) => {
    try {
      const statusId = req.params.statusId;
      await deleteStatus(statusId);
      res.status(200).json({ message: 'Status deleted successfully' });
    } catch (error) {
      console.error('Error deleting status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const editStatus = async (req, res) => {
    try {
        const statusId = req.params.statusId;
        const { image, description } = req.body;

        // Find the status by ID and update the fields
        const updatedStatus = await Status.findByIdAndUpdate(
            statusId,
            { image, description },
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }

        return res.status(200).json({ message: 'Status updated successfully', status: updatedStatus });
    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    statusset,
    updatestatus,
    getstatus,
    deleteStatuses,
    editStatus
    
    
};
