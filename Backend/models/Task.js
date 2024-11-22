// backend/models/Task.js

const mongoose = require('mongoose');

// Define a schema for the Task model
const taskSchema = new mongoose.Schema(
  {
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
    // Date and time when the task was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Due date for the task
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
