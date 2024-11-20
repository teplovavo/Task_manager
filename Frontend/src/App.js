import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('Home'); // Track current page

  // Log the current page whenever it changes
  useEffect(() => {
    console.log(`Current page is: ${currentPage}`);
  }, [currentPage]);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation menu */}
        <nav>
          <Link to="/" onClick={() => setCurrentPage('Home')}>Home</Link> |{' '}
          <Link to="/tasks" onClick={() => setCurrentPage('Tasks')}>Tasks</Link> |{' '}
          <Link to="/news" onClick={() => setCurrentPage('News')}>News</Link> |{' '}
          <Link to="/login" onClick={() => setCurrentPage('Login')}>Login</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
