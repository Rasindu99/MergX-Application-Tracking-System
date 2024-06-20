// Requiring necessary modules
const express = require('express');
const dotenv = require('dotenv').config(); // Configuration management
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // MongoDB ORM
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const JWT = require('jsonwebtoken');

const {app, server} = require('../server/socket/socket');

// Connecting to the database
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware setup
app.use(express.json({ limit: '3mb' })); // Parsing JSON request bodies with increased payload size limit
app.use(cookieParser()); // Parsing cookies
app.use(express.urlencoded({ limit: '3mb', extended: false })); // Parsing URL-encoded request bodies with increased payload size limit

// Routes setup
app.use('/', require('./routes/authRoutes')); // Mounting auth routes
app.use('/job',  require('./routes/jobPostingRoutes'));
app.use('/status', require('./routes/statusRoutes'));
app.use('/announcement', require('./routes/announcementRoutes'));
app.use('/chatbot',require('./routes/chatRoutes'));
app.use('/interview', require('./routes/interviewscheduleRoutes'));
app.use('/evaluation', require('./routes/evaluationRoutes'));
app.use('/invitation',require('./routes/jobinterviewinvitationRoutes'));
app.use('/message', require('./routes/messageRoutes'));
app.use('/candidatedash', require('./routes/candidateRoutes'));
app.use('/users', require('./routes/userRoutes'));

//app.use('/Protected', require('./routes/ProtectedRoute'));
// Defining the port for the server to listen on
const port = 8000;

// starts listening for both regular HTTP requests (handled by Express) and WebSocket connections (handled by Socket.IO) on the specified port.
server.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});
//  server.listen(PORT) instead of app.listen(PORT),
// you're instructing the combined HTTP server (which includes both Express and Socket.IO) 
// to listen on the specified port for both regular HTTP requests and WebSocket connections. 
// This setup allows you to use both Express routes and Socket.IO functionality in the same application.
