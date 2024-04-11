// Import the express module
const express = require('express');
const generateSummary = require('./summary.js');
require('dotenv').config();

// Create an instance of express
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/generate-summary', async (req, res) => {
    const pdfUrl = req.body.pdfUrl;
    const numPages = req.body.numPages;
    const currPage = req.body.currPage;
    const summary = await generateSummary(pdfUrl, currPage, numPages);
    res.json({ summary });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});