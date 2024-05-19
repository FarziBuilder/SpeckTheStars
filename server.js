const express = require('express');
const path = require('path');
require('dotenv').config();
const corsAnywhere = require('cors-anywhere');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the API keys
app.get('/api/keys', (req, res) => {
  res.json({ apiKey, googleApiKey });
});

// Start the proxy server
const proxyHost = 'localhost';
const proxyPort = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(proxyPort, proxyHost, () => {
  console.log(`CORS Anywhere proxy is running on http://${proxyHost}:${proxyPort}`);
});

app.listen(port, () => {
  console.log(`Main server is running on http://localhost:${port}`);
});
