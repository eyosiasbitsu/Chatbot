// routes/chatbotRoutes.js
const express = require('express');
const { initiateListing, handleDynamicQuestioning, confirmListing } = require('../controllers/chatbotController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/listing/initiate', initiateListing);
router.post('/listing/dynamic', handleDynamicQuestioning);
router.post('/listing/confirm', authMiddleware, confirmListing);

module.exports = router;
