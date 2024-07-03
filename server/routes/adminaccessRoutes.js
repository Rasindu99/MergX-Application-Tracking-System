const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postaccess, putCreateUserAccount,  getCreateUserAccount, putModifyUserAccount, updateRole, getModifyUserAccount, getupdateRole, getDeleteUserAccount, putDeleteUserAccount } = require('../controllers/adminaccessController');
const { postrecruiteraccess, putCreateJobPost, putStatusCreate, putCreateAnnouncement, putSendInvitation, getCreatejobpost, getStatusCreate, getCreateAnnouncement, getSendInvitation } = require('../controllers/recruiteraccessController')
const { postaccesshiringmanager, putjobapproval, putviewfeedback, putmakedecision, getjobapproval, getviewfeedback, getmakedecision } = require('../controllers/hiringmanageraccessController')
const { postintervieweraccees, putInterviewScheduling, putJoinInterview, putSubmitEvaluation, putFeedbackSubmission, getInterviewScheduling, getJoinInterview, getSubmitEvaluation, getFeedbackSubmission } = require('../controllers/intervieweraccessController');
const {
    postCandidateAccess,
    putAssistanceChatbot,
    putAiChatbot,
    putEditProfile,
    putViewStatus,
    putViewAnnouncement,
    putAddWishlist,
    putUploadCv,
    putJoinInterviews,
    getAssistanceChatbot,
    getAiChatbot,
    getEditProfile,
    getViewStatus,
    getViewAnnouncement,
    getAddWishlist,
    getUploadCv,
    getJoinInterviews
} = require('../controllers/candidateaccessController');
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);
//admin access
router.post('/postaccess', postaccess);
router.put('/updatecreateuseraccount',putCreateUserAccount);
router.put('/modifyuseraccount',putModifyUserAccount);
router.put('/updateroleaccess', updateRole);
router.put('/deleteuser', putDeleteUserAccount);

router.get('/getcreateuseraccount',getCreateUserAccount);
router.get('/getmodifyuseraccount', getModifyUserAccount);
router.get('/getupdaterole', getupdateRole);
router.get('/getdeleteaccount', getDeleteUserAccount);

//recruiter access
router.post('/postrecruiteraccess',postrecruiteraccess);
router.put('/createjobpostaccess', putCreateJobPost);
router.put('/createstatusaccess',putStatusCreate );
router.put('/createannouncementaccess', putCreateAnnouncement);
router.put('/sendinvitationaccess', putSendInvitation);

router.get('/getcreatejobpostaccess',getCreatejobpost);
router.get('/getcreatestatusaccess',getStatusCreate );
router.get('/getcreateannouncementaccess',getCreateAnnouncement);
router.get('/getsendinvitationaccess',getSendInvitation );

//hiringmanager access
router.post('/posthmaccess', postaccesshiringmanager);
router.put('/updatejobapproval', putjobapproval);
router.put('/updateviewfeedback',putviewfeedback);
router.put('/updatemakedecision', putmakedecision);

router.get('/getjobapproval',getjobapproval);
router.get('/getviewfeedback',getviewfeedback);
router.get('/getmakedecision', getmakedecision);

//interviewer access
router.post('/postintervieweraccess',postintervieweraccees);

router.put('/createinterviewschedule', putInterviewScheduling);
router.put('/joininterview',putJoinInterview );
router.put('/submitevalution', putSubmitEvaluation);
router.put('/feedbacksubmission', putFeedbackSubmission);

router.get('/interviewscheduleget',getInterviewScheduling);
router.get('/joininterviewget', getJoinInterview);
router.get('/submitevalutionget', getSubmitEvaluation);
router.get('/feedbacksubmissionget',getFeedbackSubmission);

//candidate access
router.post('/postcandidateaccess', postCandidateAccess);

router.put('/updateassistancechatbot', putAssistanceChatbot);
router.put('/updateaichatbot', putAiChatbot);
router.put('/updateeditprofile', putEditProfile);
router.put('/updateviewstatus', putViewStatus);
router.put('/updateviewannouncement', putViewAnnouncement);
router.put('/updateaddwishlist', putAddWishlist);
router.put('/updateuploadcv', putUploadCv);
router.put('/updatejoininterviews', putJoinInterviews);

router.get('/getassistancechatbot', getAssistanceChatbot);
router.get('/getaichatbot', getAiChatbot);
router.get('/geteditprofile', getEditProfile);
router.get('/getviewstatus', getViewStatus);
router.get('/getviewannouncement', getViewAnnouncement);
router.get('/getaddwishlist', getAddWishlist);
router.get('/getuploadcv', getUploadCv);
router.get('/getjoininterviews', getJoinInterviews);

module.exports = router;
