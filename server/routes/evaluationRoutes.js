const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    createEvalautions, 
    //  updateEvaluation,
      getEvaluation,getimg,getpost,getEvaCandidates,getNotEvaluatedApplications,updateIsEvaluated,getEvaluatedApplications} = require('../controllers/evaluationController');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createevaluation',createEvalautions);
// router.put('/updateevaluation/:_id',updateEvaluation);
router.get('/',getEvaluation);
router.get('/getimg/:_id',getimg);
router.get('/getpost/:_id',getpost);
router.get('/getEvaCandidates',getEvaCandidates);
router.get('/getNotEvaluatedApplications',getNotEvaluatedApplications);
router.put('/updateIsEvaluated/:_id',updateIsEvaluated);
router.get('/getEvaluatedApplications',getEvaluatedApplications);

module.exports = router;