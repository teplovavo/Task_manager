

import React, { useState, useEffect } from 'react'; // Import React and useState
import axios from 'axios'; // Import axios for making HTTP requests
import Task from '../components/Task'; // Import the Task component

function Tasks() {
  const [tasks, setTasks] = useState([]); // List of tasks
  const [newTask, setNewTask] = useState(''); // New task description
  const [dueDate, setDueDate] = useState(''); // Due date

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const newTaskData = {
          description: newTask,
          completed: false,
          dueDate: dueDate ? new Date(dueDate) : null,
        };
        const response = await axios.post('http://localhost:3000/api/tasks', newTaskData);
        setTasks([...tasks, response.data]);
        setNewTask('');
        setDueDate('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Toggle task completion
  const toggleCompletion = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/completed`, {
        completed,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit a task
  const editTask = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Add Task Section */}
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: '200px' }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Space between sections */}
      <div style={{ marginTop: '20px' }}>
        {/* Tasks Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  toggleCompletion={toggleCompletion}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
