const express = require('express');
const router = express.Router();
const { handleChat, getChats } = require('../controllers/chatbotController');

// POST /api/chat - Handle chat message
router.post('/', handleChat);

// GET /api/chat - Get all chat history
router.get('/', getChats);

module.exports = router; 