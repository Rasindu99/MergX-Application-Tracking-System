const express = require('express');
const router = express.Router();
const cors = require('cors');
const { chatbot } = require('../controllers/chatbotController');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

router.post('/chatbot', chatbot);

module.exports = router;