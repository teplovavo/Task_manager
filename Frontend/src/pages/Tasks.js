import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);
        console.log('Fetched tasks:', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/tasks', { description: newTask });
        setTasks([...tasks, response.data]);
        setNewTask('');
        console.log('Added task:', response.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      console.log('Deleted task with id:', id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
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

export default Tasks;
