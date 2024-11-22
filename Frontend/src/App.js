

import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('Home'); // Keep track of the current page

  // Log the current page whenever it changes
  useEffect(() => {
    console.log(`Current page is: ${currentPage}`);
  }, [currentPage]);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navigation">
          <NavLink
            to="/"
            onClick={() => setCurrentPage('Home')}
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            onClick={() => setCurrentPage('Tasks')}
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            Tasks
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setCurrentPage('News')}
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            News
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setCurrentPage('Login')}
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            Login
          </NavLink>
        </nav>

        {/* Define Routes */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
