import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.phone || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          busNumber: 'temp-bus', // Will be updated later
          lat: 0,
          lng: 0
        })
      });

      if (response.ok) {
        setError('');
        setIsRegisterMode(false);
        alert('Registration successful! Please login now.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error - check internet connection');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!formData.phone || !formData.password) {
      setError('Please enter phone and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        })
      });

      if (response.ok) {
        const { token } = await response.json();
        
        const loginData = {
          name: formData.name || formData.phone,
          phone: formData.phone,
          token: token
        };

        // Save to localStorage
        localStorage.setItem('driverData', JSON.stringify(loginData));
        localStorage.setItem('authToken', token);
        
        onLogin(loginData);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error - check internet connection');
    }
    setLoading(false);
  };

  return (
    <div className="driver-app">
      <header className="app-header">
        <h1>🚌 RTC Driver App</h1>
        <p>{isRegisterMode ? 'Create your account' : 'Welcome back!'}</p>
      </header>

      <main className="main-content">
        <div className="login-form">
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="name">👤 Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="phone">� Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">🔒 Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>
          )}

          <button 
            onClick={isRegisterMode ? handleRegister : handleLogin}
            className="login-btn"
            disabled={loading}
          >
            {loading ? '⏳ Please wait...' : (isRegisterMode ? '📝 Register' : '🚪 Login')}
          </button>

          <div className="auth-toggle">
            <p>
              {isRegisterMode ? 'Already have an account?' : 'New driver?'}
              <button 
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError('');
                  setFormData({ name: '', phone: '', password: '', confirmPassword: '' });
                }}
                className="toggle-btn"
              >
                {isRegisterMode ? 'Login here' : 'Register here'}
              </button>
            </p>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}
        </div>
      </main>

      <footer className="app-footer">
        <p>{isRegisterMode ? 'Register once and start tracking buses' : 'Login once and stay logged in'}</p>
      </footer>
    </div>
  );
}

export default LoginPage;