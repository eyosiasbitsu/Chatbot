// services/externalApiService.js
const { externalApi } = require('../config/externalApi');

async function submitListing(data) {
  try {
    const response = await externalApi.post('/listings', data);
    return response.data;
  } catch (error) {
    console.error('External API Error:', error.response ? error.response.data : error.message);
    throw new Error('Error submitting the listing to the external API.');
  }
}

module.exports = {
  submitListing,
};
