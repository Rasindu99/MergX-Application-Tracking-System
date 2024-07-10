const QandAmodel = require('../models/qanda');
const {sendMail} = require('../helpers/sendMail')

//post end point Q and A
const postqanda =  async(req, res) => {
    try {
        const {username, useremail, message, read, sent } = req.body;
        //create database
        const qanda = await QandAmodel.create({
            username,
            useremail,
            message,
            read,
            sent
        });

        sendMail(useremail, "Thank you for your message!", 
            `Dear ${username},
    
    Thank you for reaching out to us. We have received your message and appreciate your interest.
    
    We will review your inquiry and get back to you as soon as possible. Our team is committed to providing timely responses, typically within 1-2 business days.
    
    If you have any urgent matters, please don't hesitate to contact us directly at 0710821694.
    
    Thank you for your patience and understanding.
    
    Best regards,
    MergeX Team
    (Application Tracking System)`)

        return res.status(201).json({ message: 'Updated successfully', qanda });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get end point
const getmessage = async(req, res) => {
    try {
        const QandAs = await QandAmodel.find();
        return res.status(200).json({QandAs});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get send false endpoint
const getsendfalsemessage = async(req, res) =>{
    try {
       const QandAs = await QandAmodel.find({sent : false}).sort({createdAt: -1}) ;
       return res.status(200).json({QandAs});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get send true endpoint
const getsendtruemessage = async(req, res) => {
    try {
        const QandAs = await QandAmodel.find({sent : true}).sort({createdAt: -1});
        return res.status(200).json({QandAs})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    postqanda,
    getmessage,
    getsendfalsemessage,
    getsendtruemessage

}