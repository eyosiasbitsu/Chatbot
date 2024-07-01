
const { callGPT } = require('../services/openaiService');

const initialText = `You are a chatbot designed to assist users in listing their cars. 
                     Start by asking the user to provide a description of the car. 
                     To help the user get started, here’s an example of a good description you can give them as a sample description: 
                     'I’m listing a 2018 Toyota Corolla in excellent condition. The car has a mileage of 45,000 KM and features a silver color. 
                     It's equipped with an automatic transmission and has been regularly serviced to maintain its superb condition. The price I’m looking for is $15,000.' 
                     Use this format to provide details about make, model, year of manufacture, condition, mileage (KM), transmission, color, and price. 
                     After receiving the user’s description, analyze it to determine which of the required fields have already been covered and collect any missing mandatory fields in a conversational manner. 
                     At the end of the conversation, summarize the collected information and return it in JSON format for user verification and final confirmation. `;
let conversationHistory = [
  { 
    role: "system", 
    content: initialText
  },
];

const handleMessage = async (req, res) => {
  const userMessage = req.body.message;

  conversationHistory.push({
    role: "user",
    content: userMessage,
  });

  conversationHistory = await callGPT(conversationHistory);

  const botResponse = conversationHistory[conversationHistory.length - 1].content;

  res.json({ response: botResponse });
};

const clearHistory = (req, res) => {
  conversationHistory = [
    { 
      role: "system", 
      content: initialText },
  ];
  res.json({ message: 'Conversation history cleared.' });
};

module.exports = { handleMessage, clearHistory };
