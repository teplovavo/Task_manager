
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    // Create a new task with the provided description
    const task = new Task({ description: req.body.description });
    // Save the task to the database
    await task.save();
    // Respond with the created task
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();
    // Respond with the list of tasks
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    // Find the task by ID and update it
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      // If no task found, respond with 404
      return res.status(404).json({ error: 'Task not found' });
    }
    // Respond with the updated task
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      // If no task found, respond with 404
      return res.status(404).json({ error: 'Task not found' });
    }
    // Respond with a success message
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Update task completion status
router.patch('/:id/completed', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true } // Return the updated document
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

module.exports = router;
