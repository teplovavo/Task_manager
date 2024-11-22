// src/pages/Login.js

import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios'; // Import axios for HTTP requests

function Login() {
  // State variables for form inputs and messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState(null);

  // State variables for user management
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // Define the backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  // Fetch users from the backend
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users`);
      setUsers(response.data);
      console.log('Fetched users:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [backendUrl]); // Include backendUrl as a dependency

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Include fetchUsers as a dependency

  // Function to validate user input
  const validateInput = () => {
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
      setError('Username should contain only letters');
      return false;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  // Handle user login or account creation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      // Attempt to log in the user
      await axios.post(`${backendUrl}/api/auth/login`, {
        username,
        password,
      });
      setGreeting(`Hello, ${username}!`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      if (error.response?.status === 400) {
        // If login fails, attempt to create a new user
        try {
          await axios.post(`${backendUrl}/api/users`, {
            username,
            password,
          });
          setGreeting(`Welcome, ${username}!`);
          fetchUsers(); // Refresh the users list
        } catch (createError) {
          setError('Failed to create user. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/users/${id}`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to start editing a user
  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditUsername(user.username);
    setEditPassword(''); // Clear the password field
  };

  // Function to update a user's information
  const updateUser = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/${id}`, {
        username: editUsername,
        password: editPassword,
      });
      setEditingUserId(null); // Exit editing mode
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {/* Login form */}
      <form onSubmit={handleLogin}>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Display error message if any */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      {/* Greeting message after successful login or account creation */}
      {greeting && <h3>{greeting}</h3>}
      <h3>Users List</h3>
      {/* List of users */}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            {editingUserId === user._id ? (
              <>
                {/* Edit username */}
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
                {/* Edit password */}
                <input
                  type="password"
                  placeholder="New password (optional)"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
                {/* Save and Cancel buttons */}
                <div className="user-actions">
                  <button onClick={() => updateUser(user._id)}>Save</button>
                  <button onClick={() => setEditingUserId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                {/* Display username */}
                <span>{user.username}</span>
                {/* Edit and Delete buttons */}
                <div className="user-actions">
                  <button onClick={() => startEditing(user)}>Edit</button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
