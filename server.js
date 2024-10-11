const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change 'index.html' to your main HTML file if different
});

// In-memory storage for feedback
let feedbackData = [];

// Handle feedback submission
app.post('/submit-feedback', (req, res) => {
  const { name, feedback } = req.body;

  if (name && feedback) {
    feedbackData.push({ name, feedback });
    res.json({ message: 'Feedback submitted successfully!' });
  } else {
    res.status(400).json({ message: 'Please provide all required fields.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001; // Change 3000 to 3001 or another number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
