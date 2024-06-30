const Candidateaccessmodel = require('../models/candidateAccess');

// POST candidate access
const postCandidateAccess = async (req, res) => {
    try {
        const { 
            assistance_chatbot, 
            ai_chatbot, 
            edit_profile, 
            view_status, 
            view_announcement, 
            add_wishlist, 
            upload_cv, 
            join_interviews 
        } = req.body;

        // Check for the presence of required fields
        if (typeof assistance_chatbot !== 'boolean' || 
            typeof ai_chatbot !== 'boolean' || 
            typeof edit_profile !== 'boolean' || 
            typeof view_status !== 'boolean' || 
            typeof view_announcement !== 'boolean' || 
            typeof add_wishlist !== 'boolean' || 
            typeof upload_cv !== 'boolean' || 
            typeof join_interviews !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const candidateAccess = await Candidateaccessmodel.create({
            assistance_chatbot,
            ai_chatbot,
            edit_profile,
            view_status,
            view_announcement,
            add_wishlist,
            upload_cv,
            join_interviews
        });

        return res.status(201).json({ message: 'Updated successfully', candidateAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// PUT functions for each field
const updateField = (field) => async (req, res) => {
    try {
        const value = req.body[field];

        if (typeof value !== 'boolean') {
            return res.status(400).json({ error: `Invalid ${field} value` });
        }

        const updatedCandidateAccess = await Candidateaccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { [field]: value },
            { new: true, useFindAndModify: false }
        );

        if (!updatedCandidateAccess) {
            return res.status(404).json({ error: 'Candidate access settings not found' });
        }

        return res.status(200).json({ message: `${field} updated successfully`, updatedCandidateAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// GET functions for each field
const getField = (field) => async (req, res) => {
    try {
        const candidateAccess = await Candidateaccessmodel.findOne();

        if (!candidateAccess) {
            return res.status(404).json({ error: 'Candidate access settings not found' });
        }

        return res.status(200).json({ [field]: candidateAccess[field] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    postCandidateAccess,
    putAssistanceChatbot: updateField('assistance_chatbot'),
    putAiChatbot: updateField('ai_chatbot'),
    putEditProfile: updateField('edit_profile'),
    putViewStatus: updateField('view_status'),
    putViewAnnouncement: updateField('view_announcement'),
    putAddWishlist: updateField('add_wishlist'),
    putUploadCv: updateField('upload_cv'),
    putJoinInterviews: updateField('join_interviews'),
    getAssistanceChatbot: getField('assistance_chatbot'),
    getAiChatbot: getField('ai_chatbot'),
    getEditProfile: getField('adit_profile'),
    getViewStatus: getField('view_status'),
    getViewAnnouncement: getField('view_announcement'),
    getAddWishlist: getField('add_wishlist'),
    getUploadCv: getField('upload_cv'),
    getJoinInterviews: getField('join_interviews')
}