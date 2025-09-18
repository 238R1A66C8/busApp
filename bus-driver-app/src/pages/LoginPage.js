import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }

    if (formData.phone.length < 10) {
      setError('Phone number must be at least 10 digits');
      return false;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (isRegisterMode) {
      if (!formData.name.trim()) {
        setError('Full name is required for registration');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password
        })
      });

      if (response.ok) {
        const { token } = await response.json();
        
        const loginData = {
          name: formData.name,
          phone: formData.phone,
          token: token
        };

        onLogin(loginData);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error - check internet connection and ensure backend is running');
      console.error('Registration error:', err);
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
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
        const data = await response.json();
        
        const loginData = {
          name: data.driver?.name || formData.phone,
          phone: formData.phone,
          token: data.token
        };

        onLogin(loginData);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error - check internet connection and ensure backend is running');
      console.error('Login error:', err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="driver-app">
      <div className="login-container">
        <div className="login-card">
          <h1>🚌 RTC Driver App</h1>
          <p>{isRegisterMode ? 'Create your account' : 'Welcome back!'}</p>

          <form onSubmit={handleSubmit}>
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
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="phone">📱 Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="form-input"
                required
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
                required
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
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className={isRegisterMode ? "register-btn" : "login-btn"}
              disabled={loading}
            >
              {loading ? '⏳ Please wait...' : (isRegisterMode ? '✅ Register' : '🚀 Login')}
            </button>

            {error && <div className="error-message">⚠️ {error}</div>}

            <div className="toggle-switch">
              <span 
                className="toggle-link"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError('');
                  setFormData({
                    name: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
              >
                {isRegisterMode 
                  ? 'Already have an account? Login here' 
                  : 'New driver? Register here'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;