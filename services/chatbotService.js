// services/chatbotService.js
const openai = require('../config/openai');

let conversationState = {};

async function getGPTResponse(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);
    return "I'm having trouble right now. Please try again later.";
  }
}

async function handleListingConversation(userMessage) {
  const prompt = `
  You're a chatbot guiding a user through a listing process for products/services.
  The user will list their product/service in one go.
  Make sure to ask for the following details in a dynamic conversation:
  1. Product/service type
  2. Category
  3. Sub-category (if applicable)
  4. Price
  5. Description
  6. Images (ask to upload a link for simplicity)

  Additionally, provide helpful tips and guidance based on trends and ask for confirmation at the end.

  User: "${userMessage}"
  Chatbot:
  `;

  return await getGPTResponse(prompt);
}

function updateConversationState(key, value) {
  conversationState[key] = value;
}

function getConversationState() {
  return conversationState;
}

function resetConversationState() {
  conversationState = {};
}

async function handleDynamicQuestions(userMessage) {
  // Add your logic to dynamically ask questions and collect data
  if (!conversationState.productType) {
    updateConversationState('productType', userMessage);
    return 'What category does your product/service belong to?';
  }

  if (!conversationState.category) {
    updateConversationState('category', userMessage);
    return 'What sub-category (if applicable) does your product/service belong to?';
  }

  if (!conversationState.subCategory && conversationState.category !== 'N/A') {
    updateConversationState('subCategory', userMessage);
    return 'What is the price of your product/service?';
  }

  if (!conversationState.price) {
    updateConversationState('price', userMessage);
    return 'Please provide a description of your product/service.';
  }

  if (!conversationState.description) {
    updateConversationState('description', userMessage);
    return 'Please upload a link to an image of your product/service.';
  }

  if (!conversationState.images) {
    updateConversationState('images', [userMessage]);
    return 'Do you have any other images to add? If not, please type "No".';
  }

  if (conversationState.images && userMessage.toLowerCase() !== 'no') {
    conversationState.images.push(userMessage);
    return 'Do you have any other images to add? If not, please type "No".';
  }

  return 'All necessary details have been collected. Would you like to confirm your listing?';
}

module.exports = {
  getGPTResponse,
  handleListingConversation,
  handleDynamicQuestions,
  updateConversationState,
  getConversationState,
  resetConversationState,
};
