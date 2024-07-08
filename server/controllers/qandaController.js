const QandAmodel = require('../models/qanda');

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

module.exports = {
    postqanda,
    getmessage

}