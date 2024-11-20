// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Create new user
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;
