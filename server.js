/*const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({
    origin: 'http://localhost:3001', // Adjust as necessary
}));

// Middleware to parse JSON bodies
app.use(express.json());
//csp headers
app.use((req, res, next) => {
  res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' 'inline-speculation-rules' https://trusted-scripts.com; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Collymore150@', // Use environment variables for production
    database: 'feedback_db'
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit on connection error
    }
    console.log('Connected to MySQL database');
});

// Handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const { name, feedback } = req.body;
    console.log('Received data:', { name, feedback });
    // Ensure both name and feedback are provided
    if (!name || !feedback) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const sql = 'INSERT INTO feedbacks (name, feedback) VALUES (?, ?)';
    db.query(sql, [name, feedback], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Feedback submitted successfully!' });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({
    origin: 'http://localhost:3001' // Adjust based on where your client is running
}));

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Collymore150@', // Your MySQL password
    database: 'feedback_db' // Your database name
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit on connection error
    }
    console.log('Connected to MySQL database');
});

// Handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const { name, feedback } = req.body;
    console.log('Received data:', { name, feedback }); // Log received data

    // Ensure both name and feedback are provided
    if (!name || !feedback) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const sql = 'INSERT INTO feedbacks (name, feedback) VALUES (?, ?)';
    db.query(sql, [name, feedback], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        console.log('Feedback submitted:', result); // Log result from the database
        res.json({ message: 'Feedback submitted successfully!' });
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

