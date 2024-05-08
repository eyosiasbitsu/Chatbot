// config/externalApi.js
const axios = require('axios');
require('dotenv').config();

const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function setAuthToken(token) {
  externalApi.defaults.headers.Authorization = `Bearer ${token}`;
}

module.exports = {
  externalApi,
  setAuthToken,
};
