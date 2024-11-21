import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data); // Update users list
      console.log('Fetched users:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Validate user input
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

  // Handle user login or creation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      setGreeting(`Hello, ${username}!`);
      fetchUsers(); // Refresh users list
    } catch (error) {
      if (error.response?.status === 400) {
        try {
          await axios.post('http://localhost:3000/api/users', {
            username,
            password,
          });
          setGreeting(`Welcome, ${username}!`);
          fetchUsers(); // Refresh users list
        } catch (createError) {
          setError('Failed to create user. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Start editing a user
  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditUsername(user.username);
    setEditPassword(''); // Clear password field
  };

  // Update user information
  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, {
        username: editUsername,
        password: editPassword,
      });
      setEditingUserId(null); // Exit editing mode
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Username field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Display error message */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      {/* Greeting */}
      {greeting && <h3>{greeting}</h3>}
      <h3>Users List</h3>
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
                {/* Save and cancel buttons */}
                <button onClick={() => updateUser(user._id)}>Save</button>
                <button onClick={() => setEditingUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{user.username}</span>
                <button onClick={() => startEditing(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
