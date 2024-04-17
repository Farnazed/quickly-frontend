import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';

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
