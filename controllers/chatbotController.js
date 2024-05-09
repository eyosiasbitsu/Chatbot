// controllers/chatbotController.js
const {
  handleListingConversation,
  handleDynamicQuestions,
  getConversationState,
  resetConversationState,
  updateConversationState,
} = require('../services/chatbotService');

const { submitListing } = require('../services/externalApiService');
const { setAuthToken } = require('../config/externalApi');

async function initiateListing(req, res) {
  console.log("Was here");
  const { message } = req.body;
  const response = await handleListingConversation(message);
  res.json({ message: response });
}

async function handleDynamicQuestioning(req, res) {
  const { message } = req.body;
  const response = await handleDynamicQuestions(message);
  res.json({ message: response });
}

async function confirmListing(req, res) {
  const { token } = req.body;
  await setAuthToken(token);

  try {
    const listingData = getConversationState();
    const result = await submitListing(listingData);
    resetConversationState();
    res.json({
      message: `Your listing has been successfully submitted: ${result.id}`,
      listingData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting the listing.' });
  }
}

module.exports = {
  initiateListing,
  handleDynamicQuestioning,
  confirmListing,
};
