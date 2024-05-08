// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const {
  initiateListing,
  submitListingController,
  collectFeedback,
} = require('../controllers/chatbotController');

router.post('/listing', initiateListing);
router.post('/submit-listing', submitListingController);
router.post('/feedback', collectFeedback);

module.exports = router;
