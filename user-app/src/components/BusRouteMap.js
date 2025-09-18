import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Sample Hyderabad TSRTC bus routes with real coordinates
const SAMPLE_ROUTES = {
  '5K': {
    name: 'Route 5K: Secunderabad to HITEC City',
    color: '#22c55e',
    stops: [
      { name: 'Secunderabad Railway Station', lat: 17.4399, lng: 78.5013, time: '06:00 AM' },
      { name: 'Paradise Circle', lat: 17.4281, lng: 78.4899, time: '06:15 AM' },
      { name: 'Begumpet Airport', lat: 17.4318, lng: 78.4677, time: '06:30 AM' },
      { name: 'Ameerpet Metro', lat: 17.4374, lng: 78.4482, time: '06:45 AM' },
      { name: 'Punjagutta', lat: 17.4258, lng: 78.4519, time: '07:00 AM' },
      { name: 'Banjara Hills', lat: 17.4147, lng: 78.4477, time: '07:15 AM' },
      { name: 'Jubilee Hills', lat: 17.4232, lng: 78.4091, time: '07:30 AM' },
      { name: 'Madhapur', lat: 17.4484, lng: 78.3915, time: '07:45 AM' },
      { name: 'HITEC City', lat: 17.4485, lng: 78.3811, time: '08:00 AM' }
    ],
    path: [
      [17.4399, 78.5013], [17.4281, 78.4899], [17.4318, 78.4677],
      [17.4374, 78.4482], [17.4258, 78.4519], [17.4147, 78.4477],
      [17.4232, 78.4091], [17.4484, 78.3915], [17.4485, 78.3811]
    ]
  },
  '8A': {
    name: 'Route 8A: Koti to Gachibowli',
    color: '#3b82f6',
    stops: [
      { name: 'Koti', lat: 17.3753, lng: 78.4744, time: '06:30 AM' },
      { name: 'Abids', lat: 17.3850, lng: 78.4867, time: '06:45 AM' },
      { name: 'Liberty', lat: 17.3891, lng: 78.4866, time: '07:00 AM' },
      { name: 'Himayatnagar', lat: 17.3978, lng: 78.4747, time: '07:15 AM' },
      { name: 'Mehdipatnam', lat: 17.3969, lng: 78.4349, time: '07:45 AM' },
      { name: 'Gachibowli Stadium', lat: 17.4435, lng: 78.3414, time: '08:15 AM' }
    ],
    path: [
      [17.3753, 78.4744], [17.3850, 78.4867], [17.3891, 78.4866],
      [17.3978, 78.4747], [17.3969, 78.4349], [17.4435, 78.3414]
    ]
  },
  '10H': {
    name: 'Route 10H: Uppal to Kondapur',
    color: '#f59e0b',
    stops: [
      { name: 'Uppal', lat: 17.4061, lng: 78.5562, time: '06:00 AM' },
      { name: 'LB Nagar', lat: 17.3525, lng: 78.5522, time: '06:30 AM' },
      { name: 'Dilsukhnagar', lat: 17.3687, lng: 78.5244, time: '06:45 AM' },
      { name: 'Chaitanyapuri', lat: 17.3847, lng: 78.5069, time: '07:00 AM' },
      { name: 'Kondapur', lat: 17.4649, lng: 78.3639, time: '08:00 AM' }
    ],
    path: [
      [17.4061, 78.5562], [17.3525, 78.5522], [17.3687, 78.5244],
      [17.3847, 78.5069], [17.4649, 78.3639]
    ]
  }
};

// Custom bus stop icon
const busStopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzIyYzU1ZSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

const BusRouteMap = ({ selectedRoute = '5K', showAllRoutes = false }) => {
  // Center on Hyderabad
  const hyderabadCenter = [17.3850, 78.4867];
  
  const routesToShow = showAllRoutes 
    ? Object.entries(SAMPLE_ROUTES) 
    : [[selectedRoute, SAMPLE_ROUTES[selectedRoute]]];

  return (
    <div className="map-container">
      <MapContainer 
        center={hyderabadCenter} 
        zoom={11} 
        style={{ height: '400px', width: '100%', borderRadius: '15px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {routesToShow.map(([routeId, route]) => (
          route && (
            <div key={routeId}>
              {/* Route path */}
              <Polyline 
                positions={route.path} 
                color={route.color}
                weight={4}
                opacity={0.8}
              />
              
              {/* Bus stops */}
              {route.stops.map((stop, index) => (
                <Marker 
                  key={index}
                  position={[stop.lat, stop.lng]} 
                  icon={busStopIcon}
                >
                  <Popup>
                    <div className="bus-stop-popup">
                      <h4>{stop.name}</h4>
                      <p><strong>Route:</strong> {routeId} - {route.name}</p>
                      <p><strong>Arrival Time:</strong> {stop.time}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </div>
          )
        ))}
      </MapContainer>
      
      {/* Route Legend */}
      <div className="route-legend">
        <h4>Route Information:</h4>
        {routesToShow.map(([routeId, route]) => (
          route && (
            <div key={routeId} className="route-info">
              <span 
                className="route-color" 
                style={{ backgroundColor: route.color }}
              ></span>
              <span className="route-details">
                <strong>{routeId}:</strong> {route.name}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default BusRouteMap;