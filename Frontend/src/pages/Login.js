import React, { useState } from 'react';

function Login({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Simple hardcoded credentials for demonstration
  const validUsername = 'user';
  const validPassword = 'password';

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if credentials are valid
    if (username === validUsername && password === validPassword) {
      setAuthenticated(true);
      console.log('User authenticated');
    } else {
      alert('Invalid credentials');
      console.log('Invalid login attempt');
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
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
