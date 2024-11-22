

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
            exact="true"
            onClick={() => setCurrentPage('Home')}
            activeClassName="active-link"
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            onClick={() => setCurrentPage('Tasks')}
            activeClassName="active-link"
          >
            Tasks
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setCurrentPage('News')}
            activeClassName="active-link"
          >
            News
          </NavLink>
          <NavLink
            to="/login"
            onClick={() => setCurrentPage('Login')}
            activeClassName="active-link"
          >
            Login
          </NavLink>
        </nav>

        {/* Define Routes */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} exact="true" />
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
