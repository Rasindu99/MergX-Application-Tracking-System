const { sendMail } = require('../helpers/sendMail');
const Email = require('../models/Emails');

//post endpoint
const createEmail = async (req, res) =>{
    try {
        const {to, subject, body, file } = req.body;

        //create database
        const email = await Email.create({
            to,
            subject,
            body,
            file
        });

        sendMail(to, subject, body)

        return res.status(200).json({message: 'Update Successfully', email});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:'server error'});
    }
}

module.exports = {
 createEmail
}