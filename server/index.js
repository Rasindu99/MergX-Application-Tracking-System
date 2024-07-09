// Requiring necessary modules
const express = require('express');
const dotenv = require('dotenv').config(); // Configuration management
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // MongoDB ORM
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const JWT = require('jsonwebtoken')
const bodyParser = require('body-parser');

const {app, server} = require('../server/socket/socket');

const feedbackRoute = require('./routes/feedbackRoutes');
const interviewRoute = require('./routes/interviewRoutes');

// const Evaluationmodel = require('../server/models/evaluation');
const Evaluationmodel = require('./models/evaluation.js');



const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes');


// Middleware setup
app.use(express.json({ limit: '3mb' })); // Parsing JSON request bodies with increased payload size limit
app.use(cookieParser()); // Parsing cookies
app.use(express.urlencoded({ limit: '3mb', extended: false })); // Parsing URL-encoded request bodies with increased payload size limit
app.use(bodyParser.json());
// Routes setup
app.use('/', require('./routes/authRoutes')); // Mounting auth routes
app.use('/feedback', require('./routes/feedbackRoutes'));
app.use('/job',  require('./routes/jobPostingRoutes'));
app.use('/status', require('./routes/statusRoutes'));
app.use('/announcement', require('./routes/announcementRoutes'));
app.use('/chatbot',require('./routes/chatRoutes'));
app.use('/interview', require('./routes/interviewscheduleRoutes'));
//change schedule api ->
app.use('/schedule', require('./routes/interviewscheduleRoutes'));

app.use('/evaluation', require('./routes/evaluationRoutes'));
app.use('/invitation',require('./routes/jobinterviewinvitationRoutes'));
app.use('/access',require('./routes/adminaccessRoutes'));
app.use('/cv',require('./routes/applicationRoutes'))
app.use('/wishlist', require('./routes/addWishlistRoutes'));
app.use('/hmfeedback',require('./routes/HmRoutes.js'));

app.use('/message', messageRoutes);
app.use('/users', userRoutes);
app.use('/candidatedash', candidateRoutes); 
app.use('/', authRoutes);



//app.use('/Protected', require('./routes/ProtectedRoute'));
// Defining the port for the server to listen on
app.use('/reporting', require('./routes/ReportingRoutes'));
app.use('/dashboard', require('./routes/HMDashboardRoutes'));
app.use('/qanda', require('./routes/qandaRoutes.js'));


app.put('/evaluation/updateevaluation/:_id', async (req, res) => {
  try {
    const  _id  = req.params._id.trim();
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid _id format' });
    }
    const updateFields = {
      candidatename: req.body.candidatename,
      candidateid: req.body.candidateid,
      candidateemail: req.body.candidateemail,
      position: req.body.position,
      job_id: req.body.job_id,
      interviewername: req.body.interviewername,
      interviewerid: req.body.interviewerid,
      problemsolution: req.body.problemsolution,
      languageproficiency: req.body.languageproficiency,
      interviewercomments: req.body.interviewercomments,
      addcomment: req.body.addcomment,
      collaboration: req.body.collaboration,
      adoptability: req.body.adoptability,
      decisionmaking: req.body.decisionmaking,
      leadership: req.body.leadership,
      clarity: req.body.clarity,
      activelistening: req.body.activelistening,
      empathy: req.body.empathy,
      presentationskills: req.body.presentationskills,
      technical: req.body.technical,
      cultural: req.body.cultural,
      communication: req.body.communication,
      overallcomment: req.body.overallcomment,
      
    };

    // Check for missing required fields
    const requiredFields = Object.keys(updateFields).filter(field => !updateFields[field]);
    if (requiredFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${requiredFields.join(', ')}` });
    }

    const evaluation = await Evaluationmodel.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true } // To return the updated document
    );

    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
  } catch (error) {
    console.error('Error updating evaluation:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
});


app.put('/hmfeedback/update/:_id', async (req, res) => {
  try {
    const  _id  = req.params._id.trim();
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid _id format' });
    }
    const updateFields = {
      candidatename: req.body.candidatename,
      candidateid: req.body.candidateid,
      candidateemail: req.body.candidateemail,
      position: req.body.position,
      job_id:req.body.job_id,
      interviewername: req.body.interviewername,
      interviewerid: req.body.interviewerid,
      problemsolution: req.body.problemsolution,
      languageproficiency: req.body.languageproficiency,
      interviewercomments: req.body.interviewercomments,
      addcomment: req.body.addcomment,
      collaboration: req.body.collaboration,
      adoptability: req.body.adoptability,
      decisionmaking: req.body.decisionmaking,
      leadership: req.body.leadership,
      clarity: req.body.clarity,
      activelistening: req.body.activelistening,
      empathy: req.body.empathy,
      presentationskills: req.body.presentationskills,
      technical: req.body.technical,
      cultural: req.body.cultural,
      communication: req.body.communication,
      overallcomment: req.body.overallcomment,
      hiringManagerComment: req.body.hiringManagerComment,
    recruiterComment:req.body.recruiterComment,
    isHired:req.body.isHired
    };
    

    const evaluation = await Evaluationmodel.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true } // To return the updated document
    );

    if (!evaluation) {
      return res.status(404).json({ error: 'Evaluation not found' });
    }

    return res.status(200).json({ message: 'Evaluation updated successfully', evaluation });
  } catch (error) {
    console.error('Error updating evaluation:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
});


const port = 8000;

// starts listening for both regular HTTP requests (handled by Express) and WebSocket connections (handled by Socket.IO) on the specified port.
server.listen(port, () => { 

  mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));
  
  console.log(`Server is running on port ${port}`);
});
//  server.listen(PORT) instead of app.listen(PORT),
// you're instructing the combined HTTP server (which includes both Express and Socket.IO) 
// to listen on the specified port for both regular HTTP requests and WebSocket connections. 
// This setup allows you to use both Express routes and Socket.IO functionality in the same application.
