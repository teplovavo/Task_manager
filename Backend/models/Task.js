
const mongoose = require('mongoose');

// Define a schema for the Task model
const taskSchema = new mongoose.Schema({
  // The description of the task
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // Whether the task is completed or not
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
