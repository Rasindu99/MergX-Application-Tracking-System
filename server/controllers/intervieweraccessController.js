const Intervieweraccessmodel = require('../models/interviewerAccess');

// POST interviewer access
const postintervieweraccees = async (req, res) => {
    try {
        const { 
            interview_scheduling, 
            join_interview, 
            submit_evaluation, 
            feedback_submission 
        } = req.body;

        // Check for the presence of required fields
        if (typeof interview_scheduling !== 'boolean' || 
            typeof join_interview !== 'boolean' || 
            typeof submit_evaluation !== 'boolean' || 
            typeof feedback_submission !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const interviewerAccess = await Intervieweraccessmodel.create({
            interview_scheduling,
            join_interview,
            submit_evaluation,
            feedback_submission
        });

        return res.status(201).json({ message: 'Updated successfully', interviewerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// PUT interview_scheduling
const putInterviewScheduling = async (req, res) => {
    try {
        const { interview_scheduling } = req.body;

        if (typeof interview_scheduling !== 'boolean') {
            return res.status(400).json({ error: 'Invalid interview_scheduling value' });
        }

        const updatedInterviewerAccess = await Intervieweraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { interview_scheduling },
            { new: true, useFindAndModify: false }
        );

        if (!updatedInterviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ message: 'interview_scheduling updated successfully', updatedInterviewerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// PUT join_interview
const putJoinInterview = async (req, res) => {
    try {
        const { join_interview } = req.body;

        if (typeof join_interview !== 'boolean') {
            return res.status(400).json({ error: 'Invalid join_interview value' });
        }

        const updatedInterviewerAccess = await Intervieweraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { join_interview },
            { new: true, useFindAndModify: false }
        );

        if (!updatedInterviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ message: 'join_interview updated successfully', updatedInterviewerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// PUT submit_evaluation
const putSubmitEvaluation = async (req, res) => {
    try {
        const { submit_evaluation } = req.body;

        if (typeof submit_evaluation !== 'boolean') {
            return res.status(400).json({ error: 'Invalid submit_evaluation value' });
        }

        const updatedInterviewerAccess = await Intervieweraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { submit_evaluation },
            { new: true, useFindAndModify: false }
        );

        if (!updatedInterviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ message: 'submit_evaluation updated successfully', updatedInterviewerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// PUT feedback_submission
const putFeedbackSubmission = async (req, res) => {
    try {
        const { feedback_submission } = req.body;

        if (typeof feedback_submission !== 'boolean') {
            return res.status(400).json({ error: 'Invalid feedback_submission value' });
        }

        const updatedInterviewerAccess = await Intervieweraccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { feedback_submission },
            { new: true, useFindAndModify: false }
        );

        if (!updatedInterviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ message: 'feedback_submission updated successfully', updatedInterviewerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET interview_scheduling
const getInterviewScheduling = async (req, res) => {
    try {
        const interviewerAccess = await Intervieweraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!interviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ interview_scheduling: interviewerAccess.interview_scheduling });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET join_interview
const getJoinInterview = async (req, res) => {
    try {
        const interviewerAccess = await Intervieweraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!interviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ join_interview: interviewerAccess.join_interview });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET submit_evaluation
const getSubmitEvaluation = async (req, res) => {
    try {
        const interviewerAccess = await Intervieweraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!interviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ submit_evaluation: interviewerAccess.submit_evaluation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET feedback_submission
const getFeedbackSubmission = async (req, res) => {
    try {
        const interviewerAccess = await Intervieweraccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!interviewerAccess) {
            return res.status(404).json({ error: 'Interviewer access settings not found' });
        }

        return res.status(200).json({ feedback_submission: interviewerAccess.feedback_submission });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    postintervieweraccees,
    putInterviewScheduling,
    putJoinInterview,
    putSubmitEvaluation,
    putFeedbackSubmission,
    getInterviewScheduling,
    getJoinInterview,
    getSubmitEvaluation,
    getFeedbackSubmission
}