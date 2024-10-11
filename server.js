const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Your MySQL username
    password: 'Collymore150@', // Your MySQL password
    database: 'feedback_db'  // Your database name
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const { name, feedback } = req.body;

    // Ensure both name and feedback are provided
    if (name && feedback) {
        const sql = 'INSERT INTO feedbacks (name, feedback) VALUES (?, ?)';
        db.query(sql, [name, feedback], (err, result) => {
            if (err) {
                console.error('Error inserting feedback:', err);
                res.status(500).json({ message: 'Database error' });
                return;
            }
            res.json({ message: 'Feedback submitted successfully!' });
        });
    } else {
        res.status(400).json({ message: 'Please provide all required fields.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
