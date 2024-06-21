const Evaluationmodel = require('../models/evaluation')

const getEvolution= async(req,res)=>{
    try{
        const evaluation = await Evaluationmodel.find();
        if(!evaluation){
            return res.status(404).json({error:'Evaluation not found'})
        }
        return res.status(200).json({message:'Evaluation fetched successfully',evaluation});
    }
    catch(error){
        console.error('Error getting evaluation:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
}

module.exports={
    getEvolution
}