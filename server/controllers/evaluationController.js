const Evaluationmodel = require('../models/evaluation');

//evaluation post endpoint
const createevaluation = async (req, res) => {
    try {
        const { username, candidate} = req.body;
        if(!username ||  !candidate) {
            return res.status(400).json({error: 'missing field'})
        };

        //create database
        const evaluation = await Evaluationmodel.create({
            username,
            candidate
        });
        return res.status(200).json({error: 'complete'})

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'})

    }
}

module.exports = {
    createevaluation
}