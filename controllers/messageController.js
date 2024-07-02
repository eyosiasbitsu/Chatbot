
const { callGPT } = require('../services/openaiService');

const initialText = `You are a chatbot tasked with assisting users in listing their cars for sale. 
                     Begin the interaction by asking whether the user wishes to list a car or a house. 
                     Then, request a brief description of their product. To guide them, provide an example of an effective car description:
                     'Example: I am listing a 2018 Toyota Corolla in excellent condition. This car has a mileage of 45,000 KM, features a silver color, and is equipped with an automatic transmission. 
                     It has been regularly serviced to maintain its superb condition. I am asking for $15,000.'
                     Inform the user that the required fields for listing a car are: make, model, year of manufacture, condition, mileage (KM), transmission, color, and price.
                     After receiving the user’s description, analyze it to determine which of the required fields are already covered. 
                     
                     For any missing mandatory fields, collect the information in a conversational manner, by giving the user a sample description that contains only the missing fileds. Provide examples for each field to guide the user on what information is needed.
                     At the conclusion of the conversation, summarize the collected information and return it in JSON format for user verification and final confirmation. 
                     Ensure that you do not display the collected information until the chat ends.
                     When returning the final JSON, use 'zzz' as a delimiter between the conversational text and the actual JSON data. 
                     This separation will allow the frontend team to extract the JSON and display a form based on the collected data.
`;

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
