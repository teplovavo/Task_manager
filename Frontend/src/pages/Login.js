import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState(null);
  const [users, setUsers] = useState([]);

  // Function to validate input
  const validateInput = () => {
    const usernameRegex = /^[a-zA-Z]+$/; // Only letters allowed
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

  // Function to handle login or user creation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      // Try logging in the user
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });

      console.log('Login successful:', response.data);
      setGreeting(`Hello, ${username}!`);
      fetchUsers(); // Fetch updated users
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // User not found, create a new user
        console.log('User not found. Creating new user...');
        try {
          const createResponse = await axios.post('http://localhost:3000/api/users', {
            username,
            password,
          });
          console.log('User created:', createResponse.data);
          setGreeting(`Welcome, ${username}!`);
          fetchUsers(); // Fetch updated users
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
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
