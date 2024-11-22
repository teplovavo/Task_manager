

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // User's unique username
  password: { type: String, required: true }, // User's password
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
