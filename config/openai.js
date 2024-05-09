// config/openai.js
const OpenAIApi  = require('openai');
require('dotenv').config();


const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

module.exports = openai;
