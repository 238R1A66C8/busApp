import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import './AppClean.css';
import BusRouteMap from './components/BusRouteMap';

// Map Page Component
function MapPage() {
  const [searchParams] = useSearchParams();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const routeId = searchParams.get('route') || '5K';
  const routeName = searchParams.get('name') || `Route ${routeId}`;

  return (
    <div className="map-page-container">
      <div className="map-page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>🗺️ {routeName}</h1>
        <div className="route-info-header">
          <span className="route-badge-header">{routeId}</span>
          <span className="route-status-header">🟢 Active</span>
          <button className="info-toggle-btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? '✕ Close' : 'ℹ️ Info'}
          </button>
        </div>
      </div>
      
      {/* Centered Map with Sidebar */}
      <div className={`map-page-content ${showDetails ? 'with-details' : ''}`}>
        <div className="fullscreen-map-container">
          <BusRouteMap selectedRoute={routeId} />
        </div>

        {/* Route Details Sidebar */}
        {showDetails && (
          <div className="route-details-popup">
            <div className="popup-header">
              <h3>📍 Route Information</h3>
              <button className="close-popup-btn" onClick={() => setShowDetails(false)}>×</button>
            </div>
            <div className="popup-content">
              <div className="route-details-panel">
                <p><strong>Route:</strong> {routeId}</p>
                <p><strong>Status:</strong> <span className="status-active">Active</span></p>
                <p><strong>Next Bus:</strong> <span className="next-bus">5 minutes</span></p>
                <p><strong>Frequency:</strong> Every 15 minutes</p>
                <p><strong>Fare:</strong> ₹25 - ₹35</p>
                <p><strong>Total Distance:</strong> 24.5 km</p>
                <p><strong>Journey Time:</strong> 45-60 minutes</p>
              </div>
              <div className="quick-actions">
                <button className="action-btn primary">Track Live</button>
                <button className="action-btn secondary">Save Route</button>
                <button className="action-btn secondary">Set Alert</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Profile Page Component  
function ProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@email.com',
    address: '123, MG Road, Secunderabad, Hyderabad'
  });
  
  const handleSave = () => {
    setEditMode(false);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>👤 Profile Management</h1>
      </div>
      <div className="page-content">
        {/* Personal Information Section */}
        <div className="profile-edit-section">
          <h3>👤 Personal Information</h3>
          {editMode ? (
            <div className="profile-form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              
              <label>Phone Number</label>
              <input 
                type="tel" 
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              
              <label>Email Address</label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              
              <label>Home Address</label>
              <input 
                type="text" 
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your address"
              />
            </div>
          ) : (
            <div className="profile-display-info">
              <div className="profile-info-item">
                <strong>Name:</strong> <span>{profileData.name}</span>
              </div>
              <div className="profile-info-item">
                <strong>Phone:</strong> <span>📱 {profileData.phone}</span>
              </div>
              <div className="profile-info-item">
                <strong>Email:</strong> <span>📧 {profileData.email}</span>
              </div>
              <div className="profile-info-item">
                <strong>Address:</strong> <span>🏠 {profileData.address}</span>
              </div>
              <div className="profile-info-item">
                <strong>Pass Status:</strong> <span>🎫 Student Pass Active</span>
              </div>
            </div>
          )}
          
          <div className="profile-actions">
            {editMode ? (
              <div style={{display: 'flex', gap: '10px', width: '100%'}}>
                <button style={{
                  flex: '1', 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }} onClick={handleSave}>💾 Save</button>
                <button style={{
                  flex: '1',
                  background: '#f0f0f0',
                  color: '#333',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }} onClick={() => setEditMode(false)}>❌ Cancel</button>
              </div>
            ) : (
              <button style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '200px'
              }} onClick={() => setEditMode(true)}>✏️ Edit</button>
            )}
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="profile-edit-section">
          <h3>🛠️ Account Settings</h3>
          <div className="profile-settings-item">
            <label>🔐 Change Password</label>
            <button style={{
              background: '#f0f0f0',
              color: '#333',
              padding: '8px 15px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              minWidth: '80px'
            }}>Change</button>
          </div>
          <div className="profile-settings-item">
            <label>📧 Email Notifications</label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="profile-settings-item">
            <label>📱 SMS Alerts</label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="profile-settings-item">
            <label>🌙 Dark Mode</label>
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Digital Bus Pass Section */}
        <div className="profile-edit-section">
          <h3>🎫 Digital Bus Pass</h3>
          <div className="profile-bus-pass">
            <h4>TSRTC Student Pass</h4>
            <div className="profile-bus-pass-details">
              <div className="profile-bus-pass-info">
                <p><strong>Pass ID:</strong> SP2024001234</p>
                <p><strong>Valid Until:</strong> March 31, 2026</p>
                <p><strong>Route Coverage:</strong> All City Routes</p>
                <p><strong>Monthly Limit:</strong> ₹2000</p>
                <p><strong>Used This Month:</strong> ₹480</p>
              </div>
              <div className="profile-bus-pass-qr">
                <div style={{fontSize: '40px', margin: '10px 0'}}>⬛⬜⬛</div>
                <div style={{fontSize: '40px', margin: '10px 0'}}>⬜⬛⬜</div>
                <div style={{fontSize: '40px', margin: '10px 0'}}>⬛⬜⬛</div>
                <small>Show to conductor</small>
              </div>
            </div>
            <div style={{marginTop: '15px', display: 'flex', justifyContent: 'center'}}>
              <button style={{
                background: 'rgba(255, 255, 255, 0.25)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '200px'
              }}>
                🔄 Renew Pass
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="profile-edit-section">
          <h3>📊 Travel Statistics</h3>
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <strong>24</strong>
              <span>Trips This Month</span>
            </div>
            <div className="profile-stat-card">
              <strong>₹480</strong>
              <span>Amount Spent</span>
            </div>
            <div className="profile-stat-card">
              <strong>5</strong>
              <span>Saved Routes</span>
            </div>
            <div className="profile-stat-card">
              <strong>156</strong>
              <span>Total Trips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Saved Routes Page
function SavedRoutesPage() {
  const navigate = useNavigate();
  
  const savedRoutes = [
    { id: '5K', name: 'Secunderabad - HITEC City', duration: '45 mins', fare: '₹25' },
    { id: '8A', name: 'Koti - Gachibowli', duration: '60 mins', fare: '₹30' },
    { id: '10H', name: 'Uppal - Kondapur', duration: '75 mins', fare: '₹35' },
    { id: '16A', name: 'Jubilee Hills - Begumpet', duration: '35 mins', fare: '₹20' },
    { id: '29B', name: 'Ameerpet - Kukatpally', duration: '50 mins', fare: '₹28' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>⭐ Saved Routes</h1>
      </div>
      <div className="page-content">
          <div className="profile-edit-section">
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.2rem'
            }}>
              <span>⭐</span>
              <span>Your Favorite Routes</span>
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '15px'
            }}>
              {savedRoutes.map((route) => (
                <div key={route.id} 
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(102, 126, 234, 0.15)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => navigate(`/map?route=${route.id}&name=${encodeURIComponent(route.name)}`)}>
                  
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(135deg, #667eea, #764ba2)' }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>{route.id}</div>
                    
                    <div>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: '#333',
                        marginBottom: '4px'
                      }}>{route.name}</div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span>⏱️ {route.duration}</span>
                        <span>•</span>
                        <span>💰 {route.fare}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(76, 175, 80, 0.1)',
                    color: '#4CAF50',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    height: 'fit-content'
                  }}>🟢 Active</div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              }} onClick={() => navigate('/')}>
                🔍 Find New Routes
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

// Recent Trips Page
function RecentTripsPage() {
  const navigate = useNavigate();
  
  const recentTrips = [
    { id: 1, route: '5K', from: 'Secunderabad', to: 'HITEC City', date: '2024-09-19', time: '08:30 AM', fare: '₹25' },
    { id: 2, route: '8A', from: 'Koti', to: 'Gachibowli', date: '2024-09-18', time: '06:15 PM', fare: '₹30' },
    { id: 3, route: '10H', from: 'Uppal', to: 'Kondapur', date: '2024-09-17', time: '09:45 AM', fare: '₹35' },
    { id: 4, route: '5K', from: 'HITEC City', to: 'Secunderabad', date: '2024-09-17', time: '07:20 PM', fare: '₹25' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>🕐 Recent Trips</h1>
      </div>
      <div className="page-content">
          <div className="profile-edit-section">
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#2c3e50',
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '1.2rem'
            }}>
              <span>🚌</span>
              <span>Your Travel History</span>
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {recentTrips.map((trip) => (
                <div key={trip.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                  padding: '16px',
                  border: '1px solid rgba(102, 126, 234, 0.15)',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '4px 0 0 4px'
                  }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '14px'
                    }}>{trip.route}</div>
                    
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: '#333',
                        marginBottom: '5px'
                      }}>
                        <span>{trip.from}</span>
                        <span style={{ color: '#999' }}>→</span>
                        <span>{trip.to}</span>
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span>📅 {trip.date}</span>
                        <span>⏰ {trip.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    color: '#667eea',
                    fontSize: '14px'
                  }}>{trip.fare}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '20px',
              background: 'rgba(102, 126, 234, 0.05)',
              padding: '15px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>This Month's Spending</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50' }}>₹115</div>
              </div>
              
              <button style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                View All
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <div className="page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>⚙️ Settings</h1>
      </div>
      <div className="page-content">
        <div className="profile-edit-section">
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c3e50',
            fontSize: '1.3rem',
            fontWeight: '700',
            marginBottom: '1.2rem'
          }}>
            <span>🔔</span>
            <span>Notifications</span>
          </h3>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '16px',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            marginBottom: '10px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Bus Arrival Alerts</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Route Updates</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c3e50',
            fontSize: '1.3rem',
            fontWeight: '700',
            margin: '1.5rem 0 1.2rem'
          }}>
            <span>🎨</span>
            <span>Preferences</span>
          </h3>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '16px',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            marginBottom: '10px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Language</span>
              <select style={{
                background: 'white',
                border: '1px solid #667eea',
                borderRadius: '6px',
                color: '#2c3e50',
                padding: '6px 10px',
                cursor: 'pointer',
                outline: 'none'
              }}>
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Theme</span>
              <select style={{
                background: 'white',
                border: '1px solid #667eea',
                borderRadius: '6px',
                color: '#2c3e50',
                padding: '6px 10px',
                cursor: 'pointer',
                outline: 'none'
              }}>
                <option>Auto</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
          
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c3e50',
            fontSize: '1.3rem',
            fontWeight: '700',
            margin: '1.5rem 0 1.2rem'
          }}>
            <span>👤</span>
            <span>Account</span>
          </h3>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '16px',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            marginBottom: '10px'
          }}>
            <div className="clickable-setting" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Change Password</span>
              <span style={{
                color: '#667eea',
                fontWeight: '700'
              }}>→</span>
            </div>
            
            <div className="clickable-setting" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#2c3e50'
              }}>Privacy Settings</span>
              <span style={{
                color: '#667eea',
                fontWeight: '700'
              }}>→</span>
            </div>
            
            <div className="clickable-setting" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              cursor: 'pointer'
            }}>
              <span style={{ 
                fontWeight: '500', 
                color: '#ff4d4d'
              }}>Delete Account</span>
              <span style={{
                color: '#ff4d4d',
                fontWeight: '700'
              }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Help Page
function HelpPage() {
  const navigate = useNavigate();
  
  const faqItems = [
    { question: "How do I track my bus?", answer: "Enter your bus number in the 'Track Bus' section and click search." },
    { question: "How do I save a route?", answer: "After searching for a route, click the save button to add it to your saved routes." },
    { question: "How do I use my digital pass?", answer: "Show the QR code from your profile to the bus conductor." },
    { question: "What if my bus is delayed?", answer: "Check the live tracking feature for real-time bus locations and delays." }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <button style={{
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }} onClick={() => navigate('/')}>← Back to Home</button>
        <h1>❓ Help & Support</h1>
      </div>
      <div className="page-content">
        <div className="profile-edit-section">
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c3e50',
            fontSize: '1.3rem',
            fontWeight: '700',
            marginBottom: '1.2rem'
          }}>
            <span>🔍</span>
            <span>Frequently Asked Questions</span>
          </h3>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            marginBottom: '20px'
          }}>
            {faqItems.map((item, index) => (
              <div key={index} style={{
                borderBottom: index < faqItems.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                paddingBottom: index < faqItems.length - 1 ? '12px' : '0',
                marginBottom: index < faqItems.length - 1 ? '12px' : '0',
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#667eea',
                  marginTop: '0',
                  marginBottom: '8px'
                }}>{item.question}</h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#4a5568',
                  marginTop: '0',
                  marginBottom: '0'
                }}>{item.answer}</p>
              </div>
            ))}
          </div>
          
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c3e50',
            fontSize: '1.3rem',
            fontWeight: '700',
            margin: '1.5rem 0 1.2rem'
          }}>
            <span>📱</span>
            <span>Contact Support</span>
          </h3>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px'
              }}>📞</div>
              <span style={{ fontWeight: '500', color: '#2c3e50' }}>Call: 040-2345-6789</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px'
              }}>📧</div>
              <span style={{ fontWeight: '500', color: '#2c3e50' }}>Email: support@tsrtc.gov.in</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '10px 0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px'
              }}>💬</div>
              <span style={{ fontWeight: '500', color: '#2c3e50' }}>Live Chat: Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Home Page Component
function HomePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('route');
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const swapSearchValues = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      // Navigate to map page with search results
      navigate(`/map?route=5K&name=${encodeURIComponent(`Route from ${searchFrom} to ${searchTo}`)}`);
    }
  };

  const handleTrackBus = () => {
    if (busNumber) {
      // Navigate to map page for bus tracking
      navigate(`/map?route=${busNumber}&name=${encodeURIComponent(`Tracking Bus ${busNumber}`)}`);
    }
  };

  const handleSavedRouteClick = (routeId, routeName) => {
    // Navigate to map page for saved route
    navigate(`/map?route=${routeId}&name=${encodeURIComponent(routeName)}`);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 style={{color: '#2c3e50', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem'}}>Hyderabad TSRTC</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        <div className="sidebar-menu">
          <div className="sidebar-item active" onClick={() => { navigate('/'); setSidebarOpen(false); }}>
            <i className="icon">🏠</i>
            <span>Home</span>
          </div>
          <div className="sidebar-item" onClick={() => { navigate('/profile'); setSidebarOpen(false); }}>
            <i className="icon">👤</i>
            <span>Profile</span>
          </div>
          <div className="sidebar-item" onClick={() => { navigate('/saved-routes'); setSidebarOpen(false); }}>
            <i className="icon">⭐</i>
            <span>Saved Routes</span>
          </div>
          <div className="sidebar-item" onClick={() => { navigate('/recent-trips'); setSidebarOpen(false); }}>
            <i className="icon">🕐</i>
            <span>Recent Trips</span>
          </div>
          <div className="sidebar-item" onClick={() => { navigate('/settings'); setSidebarOpen(false); }}>
            <i className="icon">⚙️</i>
            <span>Settings</span>
          </div>
          <div className="sidebar-item" onClick={() => { navigate('/help'); setSidebarOpen(false); }}>
            <i className="icon">❓</i>
            <span>Help</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <h1 style={{color: '#34495e', fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', flex: '1'}}>Hyderabad TSRTC Bus Tracking</h1>
          <div className="header-right">
            <button style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
            }} onClick={() => setShowProfilePopup(true)}>👤</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content">
          {/* Search Section */}
          <div className="search-section">
            <div className="tab-container">
              <button 
                className={`tab ${activeTab === 'route' ? 'active' : ''}`}
                onClick={() => setActiveTab('route')}
              >
                🗺️ Find Route
              </button>
              <button 
                className={`tab ${activeTab === 'track' ? 'active' : ''}`}
                onClick={() => setActiveTab('track')}
              >
                🚌 Track Bus
              </button>
            </div>

            {activeTab === 'route' && (
              <div className="route-search">
                <div className="search-form">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="From (e.g., Secunderabad)"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      className="search-input"
                    />
                    <button className="swap-btn" onClick={swapSearchValues}>⇅</button>
                    <input
                      type="text"
                      placeholder="To (e.g., HITEC City)"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <button className="search-btn gradient-bg" onClick={handleSearch}>
                    🔍 Find Routes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'track' && (
              <div className="track-search">
                <div className="search-form">
                  <input
                    type="text"
                    placeholder="Enter Bus Number (e.g., 5K, 8A, 10H)"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn gradient-bg" onClick={handleTrackBus}>
                    📍 Track Bus
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 style={{color: '#fff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.2)'}}>Quick Actions</h2>
            <div className="action-grid">
              <div className="action-card">
                <div className="action-icon gradient-bg">🚌</div>
                <h3>Live Bus Status</h3>
                <p>Check real-time bus locations</p>
              </div>
              <div className="action-card">
                <div className="action-icon gradient-bg">⏰</div>
                <h3>Bus Timings</h3>
                <p>View bus schedules and timings</p>
              </div>
              <div className="action-card">
                <div className="action-icon gradient-bg">🎫</div>
                <h3>Fare Calculator</h3>
                <p>Calculate fare for your journey</p>
              </div>
              <div className="action-card">
                <div className="action-icon gradient-bg">📱</div>
                <h3>Mobile Tickets</h3>
                <p>Book and manage digital tickets</p>
              </div>
            </div>
          </div>

          {/* Saved Routes */}
          <div className="saved-routes">
            <h2 style={{color: '#fff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.2)'}}>Saved Routes</h2>
            <div className="route-list">
              <div className="route-item clickable" onClick={() => handleSavedRouteClick('5K', 'Secunderabad - HITEC City')}>
                <div className="route-info">
                  <span className="route-number gradient-bg">5K</span>
                  <div>
                    <div className="route-name">Secunderabad - HITEC City</div>
                    <div className="route-details">45 mins • ₹25</div>
                  </div>
                </div>
                <div className="route-status">🟢 Active</div>
              </div>
              <div className="route-item clickable" onClick={() => handleSavedRouteClick('8A', 'Koti - Gachibowli')}>
                <div className="route-info">
                  <span className="route-number gradient-bg">8A</span>
                  <div>
                    <div className="route-name">Koti - Gachibowli</div>
                    <div className="route-details">60 mins • ₹30</div>
                  </div>
                </div>
                <div className="route-status">🟢 Active</div>
              </div>
              <div className="route-item clickable" onClick={() => handleSavedRouteClick('10H', 'Uppal - Kondapur')}>
                <div className="route-info">
                  <span className="route-number gradient-bg">10H</span>
                  <div>
                    <div className="route-name">Uppal - Kondapur</div>
                    <div className="route-details">75 mins • ₹35</div>
                  </div>
                </div>
                <div className="route-status">🟢 Active</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h2 style={{color: '#fff', fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.2)'}}>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🚌</div>
                <div className="activity-details">
                  <div className="activity-text">Tracked bus 5K from Secunderabad</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🗺️</div>
                <div className="activity-details">
                  <div className="activity-text">Searched route from Koti to Gachibowli</div>
                  <div className="activity-time">Yesterday</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">⭐</div>
                <div className="activity-details">
                  <div className="activity-text">Saved route 8A</div>
                  <div className="activity-time">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Profile Popup */}
      {showProfilePopup && (
        <div className="profile-modal-overlay" onClick={() => setShowProfilePopup(false)}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            borderRadius: '16px',
            padding: '24px',
            width: '340px',
            maxHeight: '65vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            margin: '20px'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#999',
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setShowProfilePopup(false)}
            >
              ×
            </button>

            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              margin: '5px auto 15px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}>👤</div>
            <h3 style={{margin: '0 0 18px', fontSize: '20px', textAlign: 'center'}}>John Doe</h3>
            
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '18px'
            }}>
              <p style={{margin: '5px 0', fontSize: '13px'}}><strong>📱 Phone:</strong> +91 9876543210</p>
              <p style={{margin: '5px 0', fontSize: '13px'}}><strong>📧 Email:</strong> john.doe@email.com</p>
              <p style={{margin: '5px 0', fontSize: '13px'}}><strong>🎫 Pass Status:</strong> <span style={{
                background: '#4CAF50', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: 'bold'
              }}>Active</span></p>
            </div>
            
            {/* Bus Pass Section with QR */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '18px',
              color: 'white'
            }}>
              <h4 style={{color: 'white', margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600'}}>🎫 Digital Bus Pass</h4>
              <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                <div style={{flex: '1'}}>
                  <p style={{margin: '3px 0', fontSize: '12px'}}><strong>Pass ID:</strong> SP2024001234</p>
                  <p style={{margin: '3px 0', fontSize: '12px'}}><strong>Valid Until:</strong> Mar 31, 2026</p>
                  <p style={{margin: '3px 0', fontSize: '12px'}}><strong>Used:</strong> ₹480 / ₹2000</p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'white',
                  padding: '5px',
                  borderRadius: '6px',
                  minWidth: '60px',
                  height: 'fit-content'
                }}>
                  <div style={{fontSize: '10px', lineHeight: '1', fontFamily: 'monospace', letterSpacing: '-2px', color: 'black'}}>
                    <div>▪▫▪▫▪▫▪</div>
                    <div>▫▪▫▪▫▪▫</div>
                    <div>▪▫▪▫▪▫▪</div>
                    <div>▫▪▫▪▫▪▫</div>
                    <div>▪▫▪▫▪▫▪</div>
                  </div>
                  <small style={{fontSize: '8px', color: '#666', textAlign: 'center'}}>Show to conductor</small>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '10px 0', padding: '12px', background: 'rgba(102, 126, 234, 0.08)', borderRadius: '12px', marginBottom: '18px'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#667eea'}}>24</div>
                <div style={{fontSize: '11px', color: '#666'}}>Trips</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#667eea'}}>₹480</div>
                <div style={{fontSize: '11px', color: '#666'}}>Spent</div>
              </div>
            </div>
            
            <button style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '14px 0',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '15px',
              width: '100%',
              marginTop: '5px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
              transition: 'transform 0.2s ease-in-out'
            }} onClick={() => { setShowProfilePopup(false); navigate('/profile'); }}>
              View Full Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main App Component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-routes" element={<SavedRoutesPage />} />
        <Route path="/recent-trips" element={<RecentTripsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;