import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../components/Task'; // Import the Task component

function Tasks() {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [newTask, setNewTask] = useState(''); // State for the new task input

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks'); // GET request to fetch tasks
        setTasks(response.data); // Update the state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error); // Log errors to the console
      }
    };

    fetchTasks();
  }, []);

  // Add a new task to the server and update the state
  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const newTaskData = { description: newTask, completed: false }; // Prepare the new task data
        const response = await axios.post('http://localhost:3000/api/tasks', newTaskData); // POST request to add a task
        setTasks([...tasks, response.data]); // Add the new task to the state
        setNewTask(''); // Clear the input field
      } catch (error) {
        console.error('Error adding task:', error); // Log errors to the console
      }
    }
  };

  // Toggle the completion status of a task
  const toggleCompletion = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/completed`, {
        completed,
      }); // PATCH request to update task completion
      setTasks(tasks.map((task) => (task._id === id ? response.data : task))); // Update the task in the state
    } catch (error) {
      console.error('Error toggling task completion:', error); // Log errors to the console
    }
  };

  // Delete a task from the server and update the state
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`); // DELETE request to remove the task
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the task from the state
    } catch (error) {
      console.error('Error deleting task:', error); // Log errors to the console
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Input field and button for adding a new task */}
      <div>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Update the new task state
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Table for displaying tasks */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task
                key={task._id} // Unique key for each task
                task={task} // Pass the task data
                toggleCompletion={toggleCompletion} // Pass the toggleCompletion function
                deleteTask={deleteTask} // Pass the deleteTask function
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
