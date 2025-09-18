import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [driverData, setDriverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedDriverData = localStorage.getItem('driverData');
    if (savedDriverData) {
      try {
        const parsedData = JSON.parse(savedDriverData);
        if (parsedData && parsedData.token) {
          setDriverData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing saved driver data:', error);
        localStorage.removeItem('driverData');
      }
    }
    setIsLoading(false);

    // PWA Install prompt handling
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleLogin = (userData) => {
    setDriverData(userData);
    localStorage.setItem('driverData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setDriverData(null);
    localStorage.removeItem('driverData');
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="pulse-indicator">
            <div className="pulse"></div>
          </div>
          <p>🚌 Loading RTC Driver App...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {showInstall && (
          <div className="install-prompt">
            <button onClick={handleInstallClick} className="install-btn">
              📱 Install App
            </button>
            <button onClick={() => setShowInstall(false)} className="close-install">✕</button>
          </div>
        )}
        <Routes>
          <Route 
            path="/" 
            element={
              driverData ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/login" 
            element={
              driverData ? 
                <Navigate to="/dashboard" replace /> : 
                <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              driverData ? 
                <DashboardPage driverData={driverData} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;