// backend/server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser'); // Parse JSON requests
const cors = require('cors'); // Allow frontend-backend communication

const createPDF = require('./api/create-pdf');
const imageUpload = require('./api/image-upload'); // Image upload API
/*
API Endpoints in this file:
GET    /                      - Root route, server health check
POST   /api/create-pdf        - PDF creation endpoint (handled by createPDF)
POST   /api/upload            - Image upload endpoint (handled by imageUpload)
*/
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

app.use('/api/create-pdf', createPDF);
app.use('/api/image-upload', imageUpload);


// Root route for basic server check
app.get('/', (req, res) => {
    res.send('API server is running!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));