

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors once
const axios = require('axios'); // Import axios for making HTTP requests
const app = express(); // Create Express app

const PORT = process.env.PORT || 3000;

// Middleware

// Enable CORS with specified origins
app.use(cors({
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
}));

app.use(express.json()); // Parse JSON bodies

// Connecting to MongoDB
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Routes
const taskRoutes = require('./routes/tasks'); // Import task routes
const authRoutes = require('./routes/auth'); // Import auth routes
const userRoutes = require('./routes/users'); // Import user routes

app.use('/api/tasks', taskRoutes); // Use task routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/users', userRoutes); // Use user routes

// API Endpoint for News
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY; // Use the correct environment variable
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    res.json(response.data); // Send the news data back to the frontend
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
