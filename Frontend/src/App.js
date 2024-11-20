import './App.css';
import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import axios from 'axios'; // Import Axios

function App() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the new task input
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    // Async function to fetch tasks
    const fetchTasks = async () => {
      try {
        // Make a GET request to the API
        const response = await axios.get('http://localhost:3000/api/tasks');
        // Update the state with the fetched tasks
        setTasks(response.data);
        console.log('Fetched tasks:', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // Function to add a new task
  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        // Make a POST request to the API to create a new task
        const response = await axios.post('http://localhost:3000/api/tasks', { description: newTask });
        // Update the tasks state with the new task
        setTasks([...tasks, response.data]);
        setNewTask('');
        console.log('Added task:', response.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      // Make a DELETE request to the API to delete the task
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      // Update the tasks state by filtering out the deleted task
      setTasks(tasks.filter((task) => task._id !== id));
      console.log('Deleted task with id:', id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {/* Input field for new tasks */}
      <input
        type="text"
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      {/* Button to add task */}
      <button onClick={addTask}>Add Task</button>

      {/* List */}
      <ul>
        {tasks.map((task) => (
          // Render for each task
          <Task
            key={task._id}
            task={task}
            deleteTask={() => deleteTask(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
