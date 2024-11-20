// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //password hashing

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // Store hashed passwords
  password: { type: String, required: true },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  try {
    // Hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
