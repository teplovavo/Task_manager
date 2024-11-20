require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling CORS
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Connecting MongoDB
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Routes
const taskRoutes = require('./routes/tasks'); // Import task routes
const authRoutes = require('./routes/auth'); // Import auth routes

app.use('/api/tasks', taskRoutes); // Use the task routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use(cors()); // Enable CORS for all routes

// Import user routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);



// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
