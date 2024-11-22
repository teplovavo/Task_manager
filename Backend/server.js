// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors once
const app = express(); // Create Express app

const PORT = process.env.PORT || 3000;

// Middleware

// Enable CORS with specified origins
app.use(cors({
 // origin: ['http://localhost:3000', 'http://localhost:3001', 'https://teplova-task-manager.netlify.app/', 'https://teplova-task-manager.onrender.com']
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// API Endpoints
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});
