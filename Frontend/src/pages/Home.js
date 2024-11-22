

import React, { useState, useEffect } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests

function Home() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  // Define backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  // Fetch data when component mounts
  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchNews();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch news articles
  const fetchNews = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Separate tasks into completed and in progress
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
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
