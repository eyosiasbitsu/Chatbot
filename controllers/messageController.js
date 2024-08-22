
const { callGPT } = require('../services/openaiService');

const initialText = `You are a chatbot tasked with assisting users in listing vehicles for sale. Start by asking if the user wants to list a vehicle or a house, then request a brief description of their item. 
Provide a sample description for the type they choose, ensuring it is concise to avoid reaching the character limit of the GPT-4 model. 
For vehicles: make, model, year of manufacture, mileage (KM), transmission, color.
For houses: property type, number of bedrooms, bathrooms, toilets, furnishing, property size (sqm).
Common for both: category (Vehicle or Property), subcategory (for vehicles: Bicycles, Buses, Cars, Motorcycles, Trucks, Vans; for property: Apartment, Commercial property, Condominium, Cooperative (Co-op), Townhouse, Ranch/Farm, Villa), location, price, condition (new, used, slightly used).

After receiving their initial description, identify which mandatory fields are missing and collect this information conversationally by providing simple sample descriptions containing only the missing fields. Offer examples for each field to clarify required details.

At the conclusion, the chatbot will generate a comprehensive description for the 'description' field of the final JSON based on all provided information. Conclude by summarizing the collected information in JSON format without confirming completion with the user. Use nothing else but "Thank you ZZZ JSON" as the response format, with "ZZZ" as a delimiter to signal the JSON data's start, enabling the frontend team to extract and use this data.

Ensure all field values in the JSON are correctly formatted and typed. Do not display collected information until the conversation ends.
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
