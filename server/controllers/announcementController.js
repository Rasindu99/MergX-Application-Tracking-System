const Announcement = require('../models/announcement');
const { io } = require('../socket/socket');

// announcement post endpoint
const updateannouncement = async (req, res) => {
    try {
        const { user_fname, user_lname, user_email, time, title, announce } = req.body;

        if (!user_fname || !user_lname || !user_email || !time || !title || !announce) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create announcement in the database
        const announcement = await Announcement.create({
            user_fname,
            user_lname,
            user_email,
            time,
            title,
            announce,
        });
        io.emit('anouncement_update', announcement);
        return res.status(200).json({ message: 'Announcement updated successfully', announcement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// get announcement
const getannouncement = async (req, res) => {
    try {
        // Retrieve all announcements from the database
        const announcements = await Announcement.find();
        return res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// delete announcement
const deleteAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
        io.emit('anouncement_delete', announcementId);

        if (!deletedAnnouncement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }

        return res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// update announcement
const editAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
    try {
        const { title, announce } = req.body;

        if (!title || !announce) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            { title, announce },
            { new: true } // to return the updated document
        );

        if (!updatedAnnouncement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }

        return res.status(200).json({ message: 'Announcement updated successfully', announcement: updatedAnnouncement });
    } catch (error) {
        console.error('Error updating announcement', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    updateannouncement,
    getannouncement,
    deleteAnnouncement,
    editAnnouncement
};
