import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [driverId, setDriverId] = useState(localStorage.getItem('driverId') || '');
  const [driverName, setDriverName] = useState(localStorage.getItem('driverName') || '');
  const [password, setPassword] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('driverId'));
  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    let watchId;
    
    if (isTracking && busNumber && authToken) {
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
  }, [isTracking, busNumber, authToken]);

  const updateLocationOnServer = async (locationData) => {
    try {
      const updateResponse = await fetch('http://localhost:5000/api/buses/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
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
        // Token expired, need to re-login
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to update location on server');
      }
    } catch (err) {
      setError('Network error - check internet connection');
      console.error('Update error:', err);
    }
  };

  const handleLogin = async () => {
    if (!driverId.trim() || !password.trim()) {
      setError('Please enter both Driver ID and Password');
      return;
    }

    try {
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: driverId,
          password: password
        })
      });

      if (loginResponse.ok) {
        const { token } = await loginResponse.json();
        
        // Save login details
        localStorage.setItem('driverId', driverId);
        localStorage.setItem('driverName', driverName || driverId);
        localStorage.setItem('authToken', token);
        
        setAuthToken(token);
        setIsLoggedIn(true);
        setPassword(''); // Clear password for security
        setError(null);
      } else {
        const errorData = await loginResponse.json();
        setError(errorData.message || 'Login failed. Check your credentials.');
      }
    } catch (err) {
      setError('Network error - check internet connection');
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('driverId');
    localStorage.removeItem('driverName');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsTracking(false);
    setAuthToken('');
    setDriverId('');
    setDriverName('');
    setBusNumber('');
    setLocation(null);
    setLastUpdate(null);
    setError(null);
  };

  const handleStartTracking = async () => {
    if (!busNumber.trim()) {
      setError('Please enter Bus Number');
      return;
    }

    // Request location permission first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsTracking(true);
          setError(null);
        },
        (error) => {
          setError('Location permission is required. Please allow location access and try again.');
        }
      );
    } else {
      setError('GPS is not supported on this device');
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setLocation(null);
    setLastUpdate(null);
    setBusNumber('');
  };

  if (!isLoggedIn) {
    return (
      <div className="driver-app">
        <header className="app-header">
          <h1>🚌 RTC Driver Login</h1>
          <p>Login once to start using the app</p>
        </header>

        <main className="main-content">
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="driverName">👤 Driver Name:</label>
              <input
                type="text"
                id="driverName"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Enter your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="driverId">📱 Driver ID (Phone):</label>
              <input
                type="tel"
                id="driverId"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                placeholder="Enter your phone number"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">🔒 Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            <button 
              onClick={handleLogin}
              className="login-btn"
            >
              🚪 Login
            </button>

            {error && <div className="error-message">⚠️ {error}</div>}
          </div>
        </main>

        <footer className="app-footer">
          <p>Login once and start tracking your bus easily</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="driver-app">
      <header className="app-header">
        <div className="driver-welcome">
          <h1>🚌 Welcome, {driverName}!</h1>
          <p>Ready to start your journey?</p>
          <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </div>
      </header>

      <main className="main-content">
        {!isTracking ? (
          <div className="start-journey">
            <div className="journey-card">
              <h2>🚌 Start Your Journey</h2>
              
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
                � Start Journey
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
                  <span className="info-value">{driverName}</span>
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

      <footer className="app-footer">
        <p>Keep this app open while driving</p>
        <p>Location updates automatically every 30 seconds</p>
      </footer>
    </div>
  );
}

export default App;
