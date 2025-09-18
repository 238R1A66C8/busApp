import { useState } from "react";
import './App.css';
import BusRouteMap from './components/BusRouteMap';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('route');
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const swapSearchValues = () => {
    const temp = searchFrom;
    setSearchFrom(searchTo);
    setSearchTo(temp);
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      // Sample search results with matching routes
      const results = [
        { 
          id: '5K', 
          name: 'Route 5K: Secunderabad to HITEC City', 
          duration: '45 mins', 
          fare: '₹25',
          frequency: 'Every 15 mins'
        },
        { 
          id: '8A', 
          name: 'Route 8A: Koti to Gachibowli', 
          duration: '60 mins', 
          fare: '₹30',
          frequency: 'Every 20 mins'
        },
        { 
          id: '10H', 
          name: 'Route 10H: Uppal to Kondapur', 
          duration: '75 mins', 
          fare: '₹35',
          frequency: 'Every 25 mins'
        }
      ];
      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  const handleTrackBus = () => {
    // Track bus logic implementation
    console.log(`Tracking bus ${busNumber}`);
  };

  const renderContent = () => {
    if (currentPage === 'schedule') {
      return <SchedulePage />;
    } else if (currentPage === 'previous-trips') {
      return <PreviousTripsPage />;
    } else if (currentPage === 'favorites') {
      return <FavoritesPage />;
    } else if (currentPage === 'settings') {
      return <SettingsPage />;
    } else if (currentPage === 'support') {
      return <SupportPage />;
    }
    
    return (
      <>
        {/* Main Content */}
        <div className="main-content">
          {/* Search and Track Section */}
          <div className="search-section">
            <div className="search-tabs">
              <button 
                className={`tab ${activeTab === 'route' ? 'active' : ''}`}
                onClick={() => setActiveTab('route')}
              >
                Route Search
              </button>
              <button 
                className={`tab ${activeTab === 'track' ? 'active' : ''}`}
                onClick={() => setActiveTab('track')}
              >
                Track Bus
              </button>
            </div>

            {activeTab === 'route' ? (
              <div className="route-search">
                <div className="input-group">
                  <div className="inputs-container">
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="From (Secunderabad, Ameerpet, etc.)"
                        value={searchFrom}
                        onChange={(e) => setSearchFrom(e.target.value)}
                        className="search-input"
                      />
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="To (HITEC City, Gachibowli, etc.)"
                        value={searchTo}
                        onChange={(e) => setSearchTo(e.target.value)}
                        className="search-input"
                      />
                    </div>
                  </div>
                  <div className="swap-container">
                    <button className="swap-btn" onClick={swapSearchValues}>
                      ⇅
                    </button>
                  </div>
                </div>
                <button className="search-btn" onClick={handleSearch}>
                  Search Routes
                </button>
              </div>
            ) : (
              <div className="track-search">
                <div className="track-input-group">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Enter Bus Number (5K, 8A, 10H, etc.)"
                      value={busNumber}
                      onChange={(e) => setBusNumber(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
                <button className="search-btn" onClick={handleTrackBus}>
                  Track Bus
                </button>
              </div>
            )}
          </div>

          {/* Bus Routes Section */}
          <div className="routes-section">
            <h2>Popular Hyderabad TSRTC Routes</h2>
            <div className="routes-grid">
              <div className="route-card">
                <div className="route-number">5K</div>
                <div className="route-details">
                  <div className="route-name">Secunderabad - HITEC City</div>
                  <div className="route-timing">Every 15 mins | 6:00 AM - 11:00 PM</div>
                </div>
              </div>
              <div className="route-card">
                <div className="route-number">8A</div>
                <div className="route-details">
                  <div className="route-name">Ameerpet - Gachibowli</div>
                  <div className="route-timing">Every 12 mins | 5:30 AM - 11:30 PM</div>
                </div>
              </div>
              <div className="route-card">
                <div className="route-number">10H</div>
                <div className="route-details">
                  <div className="route-name">Begumpet - Kukatpally</div>
                  <div className="route-timing">Every 20 mins | 6:00 AM - 10:30 PM</div>
                </div>
              </div>
              <div className="route-card">
                <div className="route-number">18C</div>
                <div className="route-details">
                  <div className="route-name">Koti - Miyapur</div>
                  <div className="route-timing">Every 18 mins | 5:45 AM - 11:15 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results with Map */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results-with-map">
              <h2>Search Results</h2>
              
              {/* Route Map */}
              <BusRouteMap showAllRoutes={true} />
              
              {/* Search Results List */}
              <div className="search-results">
                {searchResults.map((route) => (
                  <div key={route.id} className="route-card result-card">
                    <div className="route-number">{route.id}</div>
                    <div className="route-details">
                      <div className="route-name">{route.name}</div>
                      <div className="route-timing">
                        Duration: {route.duration} | Fare: {route.fare} | {route.frequency}
                      </div>
                    </div>
                    <button className="select-route-btn">
                      Select Route
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                className="close-results-btn"
                onClick={() => setShowSearchResults(false)}
              >
                Close Results
              </button>
            </div>
          )}

        </div>
      </>
    );
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <button 
          className="menu-btn" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1 className="app-title">Hyderabad TSRTC</h1>
        <button 
          className="profile-btn" 
          onClick={() => setShowProfile(!showProfile)}
        >
          👤
        </button>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Navigation</h2>
          <button 
            className="close-btn" 
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('home'); setSidebarOpen(false); }}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-item ${currentPage === 'schedule' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('schedule'); setSidebarOpen(false); }}
          >
            📅 Schedule
          </button>
          <button 
            className={`nav-item ${currentPage === 'previous-trips' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('previous-trips'); setSidebarOpen(false); }}
          >
            🕒 Previous Trips
          </button>
          <button 
            className={`nav-item ${currentPage === 'favorites' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('favorites'); setSidebarOpen(false); }}
          >
            ⭐ Favorites
          </button>
          <button 
            className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('settings'); setSidebarOpen(false); }}
          >
            ⚙️ Settings
          </button>
          <button 
            className={`nav-item ${currentPage === 'support' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('support'); setSidebarOpen(false); }}
          >
            🆘 Support
          </button>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* User Profile */}
      {showProfile && (
        <div className="profile-popup">
          <div className="profile-header">
            <h3>User Profile</h3>
            <button 
              className="close-btn" 
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>
          </div>
          <UserProfile />
        </div>
      )}

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

// User Profile Component
function UserProfile() {
  return (
    <div className="user-profile">
      <div className="profile-info">
        <div className="user-avatar">AK</div>
        <div className="user-details">
          <h4>Akash Kumar</h4>
          <p>Phone: +91 9182399026</p>
          <p>Member since: Jan 2024</p>
        </div>
      </div>
      
      <div className="bus-pass">
        <h4>Digital Bus Pass</h4>
        <div className="pass-details">
          <p><strong>Pass ID:</strong> HYD2024001</p>
          <p><strong>Valid Until:</strong> Dec 31, 2024</p>
          <p><strong>Type:</strong> Monthly Pass</p>
        </div>
        <div className="qr-section">
          <div className="qr-code">
            <div className="qr-grid">
              <div className="qr-cell"></div><div className="qr-cell filled"></div><div className="qr-cell"></div><div className="qr-cell filled"></div>
              <div className="qr-cell filled"></div><div className="qr-cell"></div><div className="qr-cell filled"></div><div className="qr-cell"></div>
              <div className="qr-cell"></div><div className="qr-cell filled"></div><div className="qr-cell"></div><div className="qr-cell filled"></div>
              <div className="qr-cell filled"></div><div className="qr-cell"></div><div className="qr-cell filled"></div><div className="qr-cell"></div>
            </div>
          </div>
          <p className="qr-label">Scan for Bus Pass</p>
        </div>
      </div>
    </div>
  );
}

// Schedule Page Component
function SchedulePage() {
  const schedules = [
    { route: '5K', from: 'Secunderabad', to: 'HITEC City', time: '6:00 AM', nextBus: '15 mins' },
    { route: '8A', from: 'Ameerpet', to: 'Gachibowli', time: '6:15 AM', nextBus: '12 mins' },
    { route: '10H', from: 'Begumpet', to: 'Kukatpally', time: '6:30 AM', nextBus: '20 mins' },
    { route: '18C', from: 'Koti', to: 'Miyapur', time: '6:45 AM', nextBus: '18 mins' },
    { route: '9X', from: 'Jubilee Hills', to: 'Madhapur', time: '7:00 AM', nextBus: '25 mins' }
  ];

  return (
    <div className="page-content schedule-page">
      <div className="page-header">
        <h2>📅 Bus Schedule</h2>
        <p>Hyderabad TSRTC Route Timings</p>
      </div>
      
      <div className="schedule-list">
        {schedules.map((schedule, index) => (
          <div key={index} className="schedule-card">
            <div className="route-badge">{schedule.route}</div>
            <div className="schedule-info">
              <div className="route-path">
                <span className="from">{schedule.from}</span>
                <span className="arrow">→</span>
                <span className="to">{schedule.to}</span>
              </div>
              <div className="timing-info">
                <span className="start-time">First Bus: {schedule.time}</span>
                <span className="next-bus">Next: {schedule.nextBus}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Previous Trips Page Component
function PreviousTripsPage() {
  const trips = [
    { id: 1, date: '2024-09-17', route: '5K', from: 'Secunderabad', to: 'HITEC City', fare: '₹45' },
    { id: 2, date: '2024-09-16', route: '8A', from: 'Gachibowli', to: 'Ameerpet', fare: '₹35' },
    { id: 3, date: '2024-09-15', route: '10H', from: 'Kukatpally', to: 'Begumpet', fare: '₹25' },
    { id: 4, date: '2024-09-14', route: '18C', from: 'Miyapur', to: 'Koti', fare: '₹40' },
    { id: 5, date: '2024-09-13', route: '9X', from: 'Madhapur', to: 'Jubilee Hills', fare: '₹30' }
  ];

  return (
    <div className="page-content trips-page">
      <div className="page-header">
        <h2>🕒 Previous Trips</h2>
        <p>Your recent bus journey history</p>
      </div>
      
      <div className="trips-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <div className="trip-date">{trip.date}</div>
            <div className="trip-details">
              <div className="trip-route">
                <span className="route-number">{trip.route}</span>
                <div className="trip-path">
                  <span>{trip.from}</span>
                  <span className="arrow">→</span>
                  <span>{trip.to}</span>
                </div>
              </div>
              <div className="trip-fare">{trip.fare}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Favorites Page Component
function FavoritesPage() {
  const favorites = [
    { id: 1, name: 'Home to Office', route: '5K', from: 'Secunderabad', to: 'HITEC City' },
    { id: 2, name: 'Weekend Shopping', route: '8A', from: 'Ameerpet', to: 'Gachibowli' },
    { id: 3, name: 'Airport Route', route: '10H', from: 'Begumpet', to: 'Shamshabad' }
  ];

  return (
    <div className="page-content favorites-page">
      <div className="page-header">
        <h2>⭐ Favorite Routes</h2>
        <p>Your saved bus routes</p>
      </div>
      
      <div className="favorites-list">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-card">
            <div className="favorite-header">
              <h4>{favorite.name}</h4>
              <span className="route-badge">{favorite.route}</span>
            </div>
            <div className="favorite-route">
              <span>{favorite.from}</span>
              <span className="arrow">→</span>
              <span>{favorite.to}</span>
            </div>
            <div className="favorite-actions">
              <button className="btn-track">Track Now</button>
              <button className="btn-remove">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Page Component
function SettingsPage() {
  return (
    <div className="page-content settings-page">
      <div className="page-header">
        <h2>⚙️ Settings</h2>
        <p>Customize your app experience</p>
      </div>
      
      <div className="settings-sections">
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item">
            <label>Bus Arrival Alerts</label>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Route Updates</label>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Fare Changes</label>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Display</h3>
          <div className="setting-item">
            <label>Dark Mode</label>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="setting-item">
            <label>Large Text</label>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Privacy</h3>
          <div className="setting-item">
            <label>Share Location</label>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Analytics</label>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Support Page Component
function SupportPage() {
  return (
    <div className="page-content support-page">
      <div className="page-header">
        <h2>🆘 Help & Support</h2>
        <p>Get assistance with your queries</p>
      </div>
      
      <div className="support-sections">
        <div className="support-section">
          <h3>📞 Contact Information</h3>
          <div className="contact-info">
            <p><strong>TSRTC Helpline:</strong> 040-2345-6789</p>
            <p><strong>Emergency:</strong> 100</p>
            <p><strong>Email:</strong> support@tsrtc.gov.in</p>
          </div>
        </div>
        
        <div className="support-section">
          <h3>❓ Frequently Asked Questions</h3>
          <div className="faq-list">
            <details className="faq-item">
              <summary>How do I track my bus?</summary>
              <p>Use the "Track Bus" tab on the home screen and enter your bus number.</p>
            </details>
            <details className="faq-item">
              <summary>How to buy a monthly pass?</summary>
              <p>Visit any TSRTC depot or use the official TSRTC mobile app for pass purchases.</p>
            </details>
            <details className="faq-item">
              <summary>What if my bus is delayed?</summary>
              <p>Check the live tracking feature or call the helpline for real-time updates.</p>
            </details>
          </div>
        </div>
        
        <div className="support-section">
          <h3>📝 Send Feedback</h3>
          <div className="feedback-form">
            <textarea placeholder="Share your feedback or report an issue..." rows="4"></textarea>
            <button className="submit-btn">Submit Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;