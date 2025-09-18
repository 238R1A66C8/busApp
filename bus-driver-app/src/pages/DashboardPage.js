import React, { useState, useEffect, useCallback } from 'react';

function DashboardPage({ driverData, onLogout }) {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  const [busNumber, setBusNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [sidePanel, setSidePanel] = useState(false);

  const updateLocationOnServer = useCallback(async (locationData) => {
    try {
      const updateResponse = await fetch(`${API_BASE_URL}/api/buses/update-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${driverData.token}`
        },
        body: JSON.stringify({
          lat: locationData.lat,
          lng: locationData.lng
        })
      });

      if (updateResponse.ok) {
        setLastUpdate(new Date());
        setError(null);
      } else if (updateResponse.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(onLogout, 3000);
      } else {
        setError('Failed to update location on server');
      }
    } catch (err) {
      setError('Network error - check internet connection');
      console.error('Update error:', err);
    }
  }, [driverData?.token, onLogout, API_BASE_URL]);

  useEffect(() => {
    let watchId;
    
    if (isTracking && busNumber && driverData?.token) {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: new Date()
            };
            setLocation(newLocation);
            updateLocationOnServer(newLocation);
            setError(null);
          },
          (error) => {
            setError('Location access denied. Please enable location services.');
            console.error('Location error:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 30000
          }
        );
      } else {
        setError('GPS is not supported on this device');
      }
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, busNumber, driverData?.token, updateLocationOnServer]);

  const handleStartTracking = async () => {
    if (!busNumber.trim()) {
      setError('Please enter Bus Number');
      return;
    }

    // First check if geolocation is supported
    if (!navigator.geolocation) {
      setError('GPS is not supported on this device');
      return;
    }

    // Request location permission explicitly
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });

      // If we get here, permission was granted
      console.log('Location permission granted:', position);
      setIsTracking(true);
      setError(null);
    } catch (error) {
      console.error('Location permission error:', error);
      if (error.code === 1) { // PERMISSION_DENIED
        setError('Location permission denied. Please enable location access in your browser settings and try again.');
      } else if (error.code === 2) { // POSITION_UNAVAILABLE
        setError('Location unavailable. Please check your GPS settings.');
      } else if (error.code === 3) { // TIMEOUT
        setError('Location request timed out. Please try again.');
      } else {
        setError('Failed to get location. Please ensure location services are enabled.');
      }
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setLocation(null);
    setLastUpdate(null);
    setBusNumber('');
  };

  return (
    <div className="driver-app">
      {/* Side Panel */}
      <div className={`side-panel ${sidePanel ? 'open' : ''}`}>
        <div className="side-panel-header">
          <h3>📋 Menu</h3>
          <button onClick={() => setSidePanel(false)} className="close-panel">✕</button>
        </div>
        <div className="side-panel-content">
          <div className="menu-item">
            <span className="menu-icon">⚙️</span>
            <span>Settings</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">📊</span>
            <span>Trip History</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">❓</span>
            <span>Help & Support</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">ℹ️</span>
            <span>About</span>
          </div>
          <div className="menu-item logout-item" onClick={onLogout}>
            <span className="menu-icon">🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-dashboard ${sidePanel ? 'panel-open' : ''}`}>
        <header className="dashboard-header">
          <button onClick={() => setSidePanel(true)} className="menu-btn">☰</button>
          <div className="driver-info">
            <h1>Welcome, {driverData?.name}!</h1>
            <p>📱 {driverData?.phone}</p>
          </div>
        </header>

        <main className="dashboard-content">
          {!isTracking ? (
            <div className="start-journey">
              <div className="journey-card">
                <h2>🚌 Start Your Journey</h2>
                
                <div className="driver-details">
                  <div className="detail-row">
                    <span className="detail-label">👤 Driver:</span>
                    <span className="detail-value">{driverData?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📱 Phone:</span>
                    <span className="detail-value">{driverData?.phone}</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="busNumber">🚌 Bus Number:</label>
                  <input
                    type="text"
                    id="busNumber"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    placeholder="Enter bus number (e.g., RTC-123)"
                    className="form-input"
                  />
                </div>

                <button 
                  onClick={handleStartTracking}
                  className="start-journey-btn"
                >
                  🚀 Start Journey
                </button>

                {error && <div className="error-message">⚠️ {error}</div>}
              </div>
            </div>
          ) : (
            <div className="tracking-active">
              <div className="status-card">
                <div className="journey-status">
                  <div className="pulse-indicator">
                    <div className="pulse"></div>
                  </div>
                  <h2>🟢 Journey Active</h2>
                  <p>Bus {busNumber} is being tracked</p>
                </div>

                <div className="journey-info">
                  <div className="info-item">
                    <span className="info-label">👤 Driver:</span>
                    <span className="info-value">{driverData?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📱 Phone:</span>
                    <span className="info-value">{driverData?.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🚌 Bus:</span>
                    <span className="info-value">{busNumber}</span>
                  </div>
                </div>

                {location && (
                  <div className="location-display">
                    <h3>📍 Current Location</h3>
                    <div className="location-details">
                      <p>📐 {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                      <p>🎯 Accuracy: {location.accuracy?.toFixed(0)}m</p>
                    </div>
                  </div>
                )}

                {lastUpdate && (
                  <div className="last-update">
                    <p>🕒 Last Updated: {lastUpdate.toLocaleTimeString()}</p>
                  </div>
                )}

                <button 
                  onClick={handleStopTracking}
                  className="end-journey-btn"
                >
                  🏁 End Journey
                </button>

                {error && <div className="error-message">⚠️ {error}</div>}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay when side panel is open */}
      {sidePanel && <div className="overlay" onClick={() => setSidePanel(false)}></div>}
    </div>
  );
}

export default DashboardPage;