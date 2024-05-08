// app.js
const express = require('express');
const chatbotRoutes = require('./routes/chatbotRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Chatbot Routes
app.use('/chat', chatbotRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chatbot API running on port ${PORT}`));
