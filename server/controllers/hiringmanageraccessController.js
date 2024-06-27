const Hiringmanageraccessmodel =  require('../models/hiringManagerAccess');

//postmethod
const postaccesshiringmanager = async (req, res) => {
    try {
        const { job_approval, view_feedback, make_decision } = req.body;

        // Check required fields
        if (typeof job_approval !== 'boolean' || typeof view_feedback !== 'boolean' || typeof make_decision !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const hiringManagerAccess = await Hiringmanageraccessmodel.create({
            job_approval,
            view_feedback,
            make_decision
        });

        // Send a response back to the client
        return res.status(201).json({ message: 'Access settings created successfully', data: hiringManagerAccess });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//put job approval
const putjobapproval = async (req, res) =>{
    try {
        const {job_approval} = req.body;

        if(typeof job_approval !== 'boolean') {
            return res.status(400).json({error: 'invalid job approval value'});
        }

        const updateHiringmanagerAccess = await Hiringmanageraccessmodel.findOneAndUpdate(
            {},
            {job_approval},
            { new: true, useFindAndModify: false }
        );

        if(!updateHiringmanagerAccess) {
            return res.status(404).json({ error: 'Hiring manager access settings not found' });
        }

        return res.status(200).json({ message: 'Job approval updated successfully', data: updateHiringmanagerAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put view_feedBack
const putviewfeedback = async(req, res) =>{
    try {
        const {view_feedback} = req.body;

        if(typeof view_feedback !== 'boolean') {
            return res.status(400).json({error: 'invalid view_feedback value'});
        }

        const updateHiringmanagerAccess = await Hiringmanageraccessmodel.findOneAndUpdate(
            {},
            {view_feedback},
            { new: true, useFindAndModify: false }
        );

        if(!updateHiringmanagerAccess) {
            return res.status(404).json({ error: 'Hiring manager access settings not found' });
        }

        return res.status(200).json({ message: 'view feedback access updated successfully', data: updateHiringmanagerAccess });
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put make_decision
const putmakedecision = async(req, res) =>{
    try {
        const {make_decision} = req.body;

        if(typeof make_decision !== 'boolean') {
            return res.status(400).json({error: 'invalid make_decision value'});
        }

        const updateHiringmanagerAccess = await Hiringmanageraccessmodel.findOneAndUpdate(
            {},
            {make_decision},
            { new: true, useFindAndModify: false }
        );

        if(!updateHiringmanagerAccess) {
            return res.status(404).json({ error: 'Hiring manager access settings not found' });
        }

        return res.status(200).json({ message: 'make decision access updated successfully', data: updateHiringmanagerAccess });
  
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
    }
}

//get job approval
const getjobapproval = async(req, res) => {
    try {
        const hiringManagerAccess = await Hiringmanageraccessmodel.findOne();
        
        if(! hiringManagerAccess){
            return res.status(404).json({error: 'hiring manager access not found'});
        }

        return res.status(200).json({job_approval: hiringManagerAccess.job_approval});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error :'server error'});
    }
}

//getview feedback
const getviewfeedback = async(req, res)=>{
    try {
        const hiringmanagerAccess = await Hiringmanageraccessmodel.findOne();

        if(!hiringmanagerAccess){
            return res.status(404).json({error :'hiring manager access not found'});
        }

        return res.status(200).json({view_feedback: hiringmanagerAccess.view_feedback});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error :'server error'});
    }
}

//get make decision
const getmakedecision =async (req, res)=>{
    try {
        const hiringmanagerAccess = await Hiringmanageraccessmodel.findOne();

        if(! hiringmanagerAccess){
            return res.status(404).json({error:'hiring manager access not found'});

        }

        return res.status(200).json({make_decision: hiringmanagerAccess.make_decision});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error :'server error'});
    }
}


module.exports = {
    postaccesshiringmanager,
    putjobapproval,
    putviewfeedback,
    putmakedecision,
    getjobapproval,
    getviewfeedback,
    getmakedecision
}