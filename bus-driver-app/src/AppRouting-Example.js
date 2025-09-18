// Example App.js with routing structure
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// Import other pages as needed

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driverData, setDriverData] = useState(null);

  const handleLogin = (loginData) => {
    setIsLoggedIn(true);
    setDriverData(loginData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDriverData(null);
  };

  return (
    <Router>
      <div className="driver-app">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashboardPage driverName={driverData?.name} /> : <Navigate to="/login" />} 
          />
          
          {/* Add more routes here */}
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;