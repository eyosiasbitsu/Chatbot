// config/openai.js
const { Configuration, OpenAIClient } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIClient(configuration);

module.exports = openai;
