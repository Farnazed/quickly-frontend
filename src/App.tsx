import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';

import './App.css';

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
