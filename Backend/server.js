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
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://teplova-task-manager.netlify.app']
}));

app.use(express.json()); // Parse JSON bodies

// Connecting to MongoDB
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
