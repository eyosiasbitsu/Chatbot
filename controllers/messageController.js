
const { callGPT } = require('../services/openaiService');

const initialText = `You are a chatbot tasked with assisting users in listing their cars for sale. 
                     Begin the interaction by asking whether the user wishes to list a car or a house. 
                     Then, request a brief description of their product. 
                     To guide them, provide an example of an effective description of the product they chose whcih includes all of the mandatory fields stated below.
                     for any sample description you generate, please note that we want the charaters to be as small as possible to brevent reaching the charater limit of gpt 4 model.
                     chat, please note that the following are required fileds and please don't ask them to mention them in the description since it will make the description long(I want it simple and yeasy):
                      only for cars: make, model, year of manufacture, mileage (KM), transmission, color.
                      only for houses: Property type, numberOfBedrooms, numberOfBathrooms, numberOfToilets, Furnishing, Property size (sqm).
                      Common to houses and cars: category(Vehicle or property), subCategory(for vehicle: Bicycles, buses, cars, motorcycles, trucks, vans;; 
                        for property: Apartment, Commercial property, Condominum, Cooperative (Co-op), Townhouse, Ranch/Farm, Villa), location, price, condition(new, used, slightlyUsed), 
                        description(generate this one by your self after you get all of the values, chat).
                     After receiving the user’s description, analyze it to determine which of the required fields are already covered. 
                     For any missing mandatory fields, collect the information in a conversational manner, by giving the user a simple sample description that contains only the missing fileds. 
                     Provide examples for each field to guide the user on what information is needed.
                     At the conclusion of the conversation, summarsize the collected information and return it in JSON format for user verification and final confirmation. 
                     Ensure that you do not display the collected information until the chat ends.
                     Please don't confirm with the user when you finshed getting all the required fields just send  final response with the json. When returning the final JSON, return it like this: Thank you     ZZZ  JSON.
                     We can use the ZZZ as a delimeter to know the rest of the string is the JSON file.
                     This separation will allow the frontend team to extract the JSON and display a form based on the collected data.
                     when you return the json, please make sure the values of each filed are in the corect format and data type.
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
