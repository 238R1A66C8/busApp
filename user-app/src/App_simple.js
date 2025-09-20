import React, { useState } from "react";
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('route');
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const swapSearchValues = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      alert(`Searching route from ${searchFrom} to ${searchTo}`);
    }
  };

  const handleTrackBus = () => {
    if (busNumber) {
      alert(`Tracking bus ${busNumber}`);
    }
  };

  const handleSavedRouteClick = (routeId, routeName) => {
    alert(`Opening route ${routeId}: ${routeName}`);
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
          <div className="sidebar-item active">
            <i className="icon">🏠</i>
            <span>Home</span>
          </div>
          <div className="sidebar-item" onClick={() => setShowProfile(true)}>
            <i className="icon">👤</i>
            <span>Profile</span>
          </div>
          <div className="sidebar-item">
            <i className="icon">⭐</i>
            <span>Saved Routes</span>
          </div>
          <div className="sidebar-item">
            <i className="icon">🕐</i>
            <span>Recent Trips</span>
          </div>
          <div className="sidebar-item">
            <i className="icon">⚙️</i>
            <span>Settings</span>
          </div>
          <div className="sidebar-item">
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
            <button className="profile-btn" onClick={() => setShowProfile(true)}>👤</button>
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
                <div className="activity-icon gradient-bg">🚌</div>
                <div className="activity-details">
                  <div className="activity-text">Tracked bus 5K from Secunderabad</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon gradient-bg">🗺️</div>
                <div className="activity-details">
                  <div className="activity-text">Searched route from Koti to Gachibowli</div>
                  <div className="activity-time">Yesterday</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon gradient-bg">⭐</div>
                <div className="activity-details">
                  <div className="activity-text">Saved route 8A</div>
                  <div className="activity-time">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="gradient-text">User Profile</h2>
              <button className="close-btn" onClick={() => setShowProfile(false)}>×</button>
            </div>
            <div className="profile-info">
              <div className="profile-avatar gradient-bg">👤</div>
              <div className="profile-details">
                <h3>John Doe</h3>
                <p>📱 +91 9876543210</p>
                <p>📧 john.doe@email.com</p>
                <p>🎫 Student Pass Active</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value gradient-text">24</div>
                <div className="stat-label">Trips This Month</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text">₹480</div>
                <div className="stat-label">Amount Spent</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text">5</div>
                <div className="stat-label">Saved Routes</div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile-btn gradient-bg">Edit Profile</button>
              <button className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;