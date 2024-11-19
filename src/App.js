
import './App.css';
import React, { useState } from 'react';
import Task from './component/task.js';
import News from './component/news.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});


function App() {
  // !! State to hold all the tasks
  const [tasks, setTasks] = useState([]);
  // state to hold new     task input
  const [newTask, setNewTask] = useState('');

  //add a new task////////////////////////////////////////////////
  const addTask = () => {
    if (newTask.trim() !== '') {
                    // Add to the tasks array
      setTasks([...tasks, newTask]);
                    // Clear the input field
      setNewTask('');
    }
  };


  // Function to delete a task//////////////////////////////////////
  const deleteTask = (index) => {
       // removing the task at index
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {/* input field for new tasks */}
      <input
        type="text"
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      {/* button to add task */}
      <button onClick={addTask}>Add Task</button>

      {/* List  */}
      <ul>
        {tasks.map((task, index) => (
          // render for each task
          <Task
            key={index}
            task={task}
            deleteTask={() => deleteTask(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
