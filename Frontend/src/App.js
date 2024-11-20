import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Login from './pages/Login';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* Navigation menu */}
        <nav>
          <Link to="/">Home</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/news">News</Link> | <Link to="/login">Login</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={authenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
