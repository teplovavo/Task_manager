const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // For password hashing

// Login or create a new user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the user exists
    let user = await User.findOne({ username });

    if (!user) {
      // If user not found, create a new one
      console.log('User not found. Creating new user...');
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      user = new User({ username, password: hashedPassword });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', user });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error logging in or creating user:', error);
    res.status(500).json({ error: 'Failed to login or create user' });
  }
});

module.exports = router;
