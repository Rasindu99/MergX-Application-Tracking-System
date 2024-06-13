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


module.exports = {
    getinvitationsendisfalse,
    getinvitationsendistrue
};