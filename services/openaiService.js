const OpenAIApi  = require("openai");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.API_KEY;

const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function callGPT(conversationHistory) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversationHistory,
    });

    const botResponse = response.choices[0].message.content;

    conversationHistory.push({
      role: "assistant",
      content: botResponse,
    });

    return conversationHistory;
  } catch (error) {
    console.error("Error:", error);
    return `An error occurred while processing the request: ${error.message}`;
  }
}

module.exports = { callGPT };
