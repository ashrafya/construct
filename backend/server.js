// backend/server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser'); // Parse JSON requests
const cors = require('cors'); // Allow frontend-backend communication
const jwt = require('jsonwebtoken'); // JWT token handling
const db = require('./db'); // Database connection

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

// JWT secret (store in .env in production!)
const JWT_SECRET = process.env.JWT_SECRET || 'temp_secret'; 

// ========================
// MIDDLEWARE: Role Checker
// ========================
const verifyRole = (allowedRoles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token
    if (!token) return res.status(401).send('Access denied: No token provided');

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(token, JWT_SECRET); 
        
        // Check if user role is permitted
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).send('Permission denied: Invalid role');
        }
    
        // Attach user data to request object
        req.user = decoded; 
        next(); // Proceed to next handler
    } 
    catch (err) {
        res.status(400).send('Invalid token');
    }
};

// ==================
// REGISTER ENDPOINT
// ==================
app.post('/auth/register', (req, res) => {
    const { email, password, role } = req.body;

    // Validate role
    if (!['consultant','contractor','client'].includes(role)) {
        return res.status(400).send('Invalid role specified');
    }

    // Insert new user
    db.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [email, password, role],
        function(err) {
            if (err) {
                // Handle duplicate email or DB errors
                return res.status(400).send(err.message); 
            }
            res.status(201).json({ id: this.lastID }); // Return new user ID
        }
    );
});

// ===============
// LOGIN ENDPOINT
// ===============
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by credentials
    db.get(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password],
        (err, user) => {
            if (err || !user) {
                return res.status(401).send('Invalid email or password');
            }

            // Generate JWT token (valid for 1 hour)
            const token = jwt.sign(
                { 
                    id: user.id, 
                    email: user.email, 
                    role: user.role 
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token }); // Return token to frontend
        }
    );
});

// ==============================
// PROTECTED ROUTE EXAMPLE (TEST)
// ==============================
app.get('/consultant-only', verifyRole(['consultant']), (req, res) => {
    res.send('Consultant secret area!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));