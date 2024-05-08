// controllers/chatbotController.js
const { handleListingConversation } = require('../services/chatbotService');
const { submitListing } = require('../services/externalApiService');
const { setAuthToken } = require('../config/externalApi');

async function initiateListing(req, res) {
  const { message, token } = req.body;
  setAuthToken(token);

  const response = await handleListingConversation(message);
  res.json({ message: response });
}

async function submitListingController(req, res) {
  const { data, token } = req.body;
  setAuthToken(token);

  try {
    const result = await submitListing(data);
    res.json({ message: 'Listing submitted successfully!', data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function collectFeedback(req, res) {
  const { message } = req.body;
  const prompt = `
  You're a chatbot collecting feedback after guiding a user through a product/service listing process.
  User: "${message}"
  Chatbot:
  `;
  const response = await handleListingConversation(prompt);
  res.json({ message: response });
}

module.exports = {
  initiateListing,
  submitListingController,
  collectFeedback,
};
