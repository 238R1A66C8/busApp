import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import './App.css';
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
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
              <>
                <button className="profile-btn primary" onClick={handleSave}>Save Changes</button>
                <button className="profile-btn secondary" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <button className="profile-btn primary" onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
            )}
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="profile-edit-section">
          <h3>🛠️ Account Settings</h3>
          <div className="profile-settings-item">
            <label>🔐 Change Password</label>
            <button className="profile-btn secondary">Change</button>
          </div>
          <div className="profile-settings-item">
            <label>� Email Notifications</label>
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
            <div className="profile-actions" style={{marginTop: '15px'}}>
              <button className="profile-btn" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}>
                Renew Pass
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>⭐ Saved Routes</h1>
      </div>
      <div className="page-content">
          <div className="routes-grid">
            {savedRoutes.map((route) => (
              <div key={route.id} className="route-card" onClick={() => navigate(`/map?route=${route.id}&name=${encodeURIComponent(route.name)}`)}>
                <div className="route-info">
                  <span className="route-number">{route.id}</span>
                  <div>
                    <div className="route-name">{route.name}</div>
                    <div className="route-details">{route.duration} • {route.fare}</div>
                  </div>
                </div>
                <div className="route-status">🟢 Active</div>
              </div>
            ))}
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>🕐 Recent Trips</h1>
      </div>
      <div className="page-content">
          <div className="trips-list">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="trip-card">
                <div className="trip-route">
                  <span className="route-badge">{trip.route}</span>
                  <div className="trip-path">
                    <span>{trip.from}</span>
                    <span className="trip-arrow">→</span>
                    <span>{trip.to}</span>
                  </div>
                </div>
                <div className="trip-details">
                  <p>{trip.date} • {trip.time}</p>
                  <p className="trip-fare">{trip.fare}</p>
                </div>
              </div>
            ))}
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>⚙️ Settings</h1>
      </div>
      <div className="page-content">
        <div className="settings-list">
          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="settings-item">
              <span>Bus Arrival Alerts</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <span>Route Updates</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="settings-item">
              <span>Language</span>
              <select className="settings-select">
                <option>English</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="settings-item">
              <span>Theme</span>
              <select className="settings-select">
                <option>Auto</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>Account</h3>
            <div className="settings-item clickable">
              <span>Change Password</span>
              <span>→</span>
            </div>
            <div className="settings-item clickable">
              <span>Privacy Settings</span>
              <span>→</span>
            </div>
            <div className="settings-item clickable">
              <span>Delete Account</span>
              <span>→</span>
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
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
        <h1>❓ Help & Support</h1>
      </div>
      <div className="page-content">
        <div className="help-content">
          <div className="help-section">
            <h3>Frequently Asked Questions</h3>
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="help-section">
            <h3>Contact Support</h3>
            <div className="contact-options">
              <div className="contact-item">
                <span>📞 Call: 040-2345-6789</span>
              </div>
              <div className="contact-item">
                <span>📧 Email: support@tsrtc.gov.in</span>
              </div>
              <div className="contact-item">
                <span>💬 Live Chat: Available 24/7</span>
              </div>
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
          <img src="/logo.png" alt="TSRTC" className="sidebar-logo" />
          <h2 className="gradient-text">Hyderabad TSRTC</h2>
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
          <h1 className="gradient-text">Hyderabad TSRTC Bus Tracking</h1>
          <div className="header-right">
            <button className="profile-btn" onClick={() => setShowProfilePopup(true)}>👤</button>
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
            <h2 className="gradient-text">Quick Actions</h2>
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
            <h2 className="gradient-text">Saved Routes</h2>
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
            <h2 className="gradient-text">Recent Activity</h2>
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
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>            
            <div className="profile-modal-header">
              <div className="profile-avatar">👤</div>
              <h3>John Doe</h3>
              <p>
                <span>📱 +91 9876543210</span>
                <span>📧 john.doe@email.com</span>
              </p>
            </div>
            
            {/* Bus Pass Section */}
            <div className="profile-bus-pass-mini">
              <h4>🎫 Digital Bus Pass</h4>
              <div className="bus-pass-info">
                <div className="pass-details">
                  <p><strong>Pass ID:</strong> SP2024001234</p>
                  <p><strong>Valid Until:</strong> March 31, 2026</p>
                  <p><strong>Used This Month:</strong> ₹480 / ₹2000</p>
                </div>
                <div className="pass-qr-mini">
                  <div style={{fontSize: '20px', lineHeight: '1'}}>⬛⬜⬛</div>
                  <div style={{fontSize: '20px', lineHeight: '1'}}>⬜⬛⬜</div>
                  <div style={{fontSize: '20px', lineHeight: '1'}}>⬛⬜⬛</div>
                  <small style={{marginTop: '5px', fontSize: '11px', opacity: 0.8}}>Show to conductor</small>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="profile-quick-stats">
              <div className="quick-stat-item">
                <strong>24</strong>
                <span>Trips This Month</span>
              </div>
              <div className="quick-stat-item">
                <strong>₹480</strong>
                <span>Amount Spent</span>
              </div>
            </div>
            
            <div className="profile-modal-actions">
              <button className="profile-modal-btn primary" onClick={() => { setShowProfilePopup(false); navigate('/profile'); }}>
                View Full Profile
              </button>
            </div>
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