
import './App.css';
import React, { useState } from 'react';
import Task from './component/task.js';
import Task from './component/news.js';



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
