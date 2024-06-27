const EvaluationModel = require('../models/evaluation');
const Application = require('../models/application');

const getAllHiredCount = async (req, res) => {
    try {
        const count = await EvaluationModel.countDocuments({ isHired: true });
        res.status(200).json({ hiredcount: count });
    } catch (err) {
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
};

const getHiredCountByPosition = async (req, res) => {
    try {
        const results = await EvaluationModel.aggregate([
            { $match: { isHired: true } },
            { $group: { _id: '$position', count: { $sum: 1 } } }
        ]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Error during aggregation', details: err });
    }
};

const getTotalEvaluationsCount = async (req, res) => {
    try {
        const count = await EvaluationModel.countDocuments({});
        res.json({ total: count });
    } catch (err) {
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
};

const getAllApplicationCount = async(req,res)=>{
    try{
        const count = await Application.countDocuments({});
        res.status(200).json({ total: count });
    }catch(err){
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
  }

module.exports = {
    getAllHiredCount,
    getHiredCountByPosition,
    getTotalEvaluationsCount,
    getAllApplicationCount
};
