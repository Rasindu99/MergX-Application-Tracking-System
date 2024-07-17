const InterviewSchedule = require('../models/interviewSchedule');

//get interview invitation send = false
const getinvitationsendisfalse = async (req, res) => {
    try {
        const interviewschedules = await InterviewSchedule.find({send : false }).sort({ createdAt: -1 });

        if (!interviewschedules || interviewschedules.length === 0) {
            return res.status(404).json({ message: "All are expired job " });
        }

        // Return the array of job postings
        return res.status(200).json(interviewschedules);
    } catch (error) {
       console.log(error);
       return res.status(500).json({message: error.message}) 
    }
}

//get interview invitation send = true
const getinvitationsendistrue = async (req, res) => {
    try {
        const interviewschedules = await InterviewSchedule.find({send : true }).sort({ createdAt: -1 });

        if (!interviewschedules || interviewschedules.length === 0) {
            return res.status(404).json({ message: "All are expired job " });
        }

        // Return the array of job postings
        return res.status(200).json(interviewschedules);
    } catch (error) {
       console.log(error);
       return res.status(500).json({message: error.message}) 
    }
}

//update sendbutton
const updateSend = async (req, res) => {
    const { send } = req.body;
    const { id } = req.params; // Assuming the ID is provided as a URL parameter

    try {
        const updatesend = await InterviewSchedule.findByIdAndUpdate(id, { send }, { new: true });

        if (!updatesend) {
            return res.status(404).json({ success: false, message: 'Invitation not found' });
        }

        res.status(200).json({ success: true, message: 'Invitation status updated successfully', job: updatesend });
    } catch (error) {
        console.error('Error updating invitation send status:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



module.exports = {
    getinvitationsendisfalse,
    getinvitationsendistrue,
    updateSend
};