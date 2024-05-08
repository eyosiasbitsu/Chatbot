// services/chatbotService.js
const openai = require('../config/openai');

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

module.exports = {
  getGPTResponse,
  handleListingConversation,
};
