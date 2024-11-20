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

  // Function to handle login
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
      setUsername('');
      setPassword('');
      fetchUsers(); // Fetch users after login
    } catch (error) {
      console.error('Error logging in:', error);
      setError('User not found or invalid credentials');
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

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      console.log('Deleted user:', id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
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
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
