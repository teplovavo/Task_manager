import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Track user being edited
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the database
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
      console.log('Fetched users:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Validate input
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

  // Handle login or user creation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      setGreeting(`Hello, ${username}!`);
      fetchUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Creating new user...');
        try {
          const createResponse = await axios.post('http://localhost:3000/api/users', {
            username,
            password,
          });
          console.log('User created:', createResponse.data);
          setGreeting(`Welcome, ${username}!`);
          fetchUsers();
        } catch (createError) {
          console.error('Error creating user:', createError);
          setError('Failed to create user. Please try again.');
        }
      } else {
        console.error('Error logging in:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Handle delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      console.log('Deleted user:', id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Start editing a user
  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditUsername(user.username);
    setEditPassword('');
  };

  // Handle updating a user
  const updateUser = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, {
        username: editUsername,
        password: editPassword,
      });
      console.log('Updated user:', id);
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      {greeting && <h3>{greeting}</h3>}

      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editingUserId === user._id ? (
              <>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New password (optional)"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
                <button onClick={() => updateUser(user._id)}>Save</button>
                <button onClick={() => setEditingUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {user.username}
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
