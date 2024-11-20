
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Login from './pages/Login';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check localStorage for authentication status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('authenticated');
    if (loggedIn) {
      setAuthenticated(true);
    }
  }, []);

  // Update localStorage when authenticated state changes
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('authenticated', true);
    } else {
      localStorage.removeItem('authenticated');
    }
  }, [authenticated]);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation menu */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/news">News</Link> | <Link to="/login">Login</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/tasks"
            element={authenticated ? <Tasks /> : <Navigate to="/tasks" />}
          />
          <Route path="/news" element={<News />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
