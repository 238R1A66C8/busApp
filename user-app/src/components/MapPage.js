import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BusRouteMap from '../components/BusRouteMap';

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const busNumber = searchParams.get('bus') || '';
  const routeId = searchParams.get('route') || '5K';
  const type = searchParams.get('type') || 'route'; // 'route' or 'track'

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="map-page">
      {/* Header */}
      <div className="map-header">
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <div className="map-title">
          {type === 'track' ? (
            <h2>🚌 Tracking Bus {busNumber}</h2>
          ) : (
            <h2>🗺️ Route: {from} to {to}</h2>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="map-container-full">
        <BusRouteMap 
          selectedRoute={routeId}
          showAllRoutes={type === 'route'}
          trackingBus={type === 'track' ? busNumber : null}
        />
      </div>

      {/* Route Info */}
      <div className="route-info-panel">
        {type === 'route' ? (
          <div className="route-details">
            <h3>📍 Journey Details</h3>
            <div className="journey-info">
              <div className="journey-point">
                <span className="point-icon from">🟢</span>
                <span className="point-text">From: {from || 'Secunderabad'}</span>
              </div>
              <div className="journey-arrow">↓</div>
              <div className="journey-point">
                <span className="point-icon to">🔴</span>
                <span className="point-text">To: {to || 'HITEC City'}</span>
              </div>
            </div>
            
            <div className="route-stats">
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <span className="stat-text">45-60 mins</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">💰</span>
                <span className="stat-text">₹25-35</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🚌</span>
                <span className="stat-text">Every 15 mins</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="tracking-details">
            <h3>🚌 Bus Tracking</h3>
            <div className="bus-info">
              <div className="bus-stat">
                <span className="stat-label">Bus Number:</span>
                <span className="stat-value">{busNumber}</span>
              </div>
              <div className="bus-stat">
                <span className="stat-label">Current Location:</span>
                <span className="stat-value">Moving towards Ameerpet</span>
              </div>
              <div className="bus-stat">
                <span className="stat-label">ETA:</span>
                <span className="stat-value">12 minutes</span>
              </div>
              <div className="bus-stat">
                <span className="stat-label">Status:</span>
                <span className="stat-value status-active">🟢 Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;