// src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios'; // Import axios for HTTP requests

function Home() {
  // State hooks for tasks, users, and articles
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  // Define the backend URL, using environment variable or localhost
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  // Fetch tasks from the backend
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [backendUrl]); // Include backendUrl as a dependency

  // Fetch users from the backend
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [backendUrl]); // Include backendUrl as a dependency

  // Fetch news articles from the external API
  const fetchNews = useCallback(async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, []); // No dependencies needed here

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchNews();
  }, [fetchTasks, fetchUsers, fetchNews]); // Include functions as dependencies

  // Separate tasks into completed and in-progress
  const completedTasks = tasks.filter((task) => task.completed);
  const inProgressTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-widgets">
        {/* Widget for completed tasks */}
        <div className="widget">
          <h3>Completed Tasks</h3>
          <ul>
            {completedTasks.slice(0, 5).map((task) => (
              <li key={task._id}>{task.description}</li>
            ))}
          </ul>
        </div>

        {/* Widget for tasks in progress */}
        <div className="widget">
          <h3>Tasks In Progress</h3>
          <ul>
            {inProgressTasks.slice(0, 5).map((task) => (
              <li key={task._id}>{task.description}</li>
            ))}
          </ul>
        </div>

        {/* Widget for active users */}
        <div className="widget">
          <h3>Active Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>

        {/* Widget for latest news */}
        <div className="widget">
          <h3>Latest News</h3>
          <ul>
            {articles.slice(0, 5).map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
