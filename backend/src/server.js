require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const busRoutes = require('./routes/busRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configure CORS more explicitly
app.use(cors({
  origin: [
    'http://localhost:3000', 'http://127.0.0.1:3000',
    'http://localhost:3001', 'http://127.0.0.1:3001',
    'http://localhost:3002', 'http://127.0.0.1:3002',
    'http://192.168.0.155:3000', 'http://192.168.0.155:3001', 'http://192.168.0.155:3002',
    'https://driver-app-3hx9.onrender.com',
    'https://use-app-rtc.onrender.com',
    /\.onrender\.com$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'RTC Bus Tracking API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/auth/login', '/api/buses/locations']
  });
});

// Simple driver login endpoint (no database required)
app.post('/api/auth/login', (req, res) => {
  const { phone, password, driverName, busNumber } = req.body;
  
  // Handle both phone/password login and driverName/busNumber login
  if (phone && password) {
    // Phone-based login (from your driver app)
    const driver = {
      id: Date.now(),
      name: `Driver-${phone.slice(-4)}`,
      phone: phone,
      busNumber: `BUS-${Math.floor(Math.random() * 100)}`,
      route: `Route for Driver ${phone}`,
      status: 'active',
      loginTime: new Date().toISOString(),
      token: `token-${Date.now()}`
    };
    
    return res.json({ 
      success: true, 
      message: 'Login successful',
      driver: driver,
      token: driver.token
    });
  }
  
  if (driverName && busNumber) {
    // Traditional driverName/busNumber login
    const driver = {
      id: Date.now(),
      name: driverName,
      busNumber: busNumber,
      route: `Route for Bus ${busNumber}`,
      status: 'active',
      loginTime: new Date().toISOString(),
      token: `token-${Date.now()}`
    };
    
    return res.json({ 
      success: true, 
      message: 'Login successful',
      driver: driver,
      token: driver.token
    });
  }
  
  return res.status(400).json({ 
    success: false, 
    message: 'Either phone/password or driverName/busNumber are required' 
  });
});

// Simple driver registration endpoint
app.post('/api/auth/register', (req, res) => {
  const { name, phone, password } = req.body;
  
  if (!name || !phone || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, phone, and password are required' 
    });
  }
  
  // Simulate successful registration
  const driver = {
    id: Date.now(),
    name: name,
    phone: phone,
    busNumber: `BUS-${Math.floor(Math.random() * 100)}`,
    route: `Route for ${name}`,
    status: 'active',
    registrationTime: new Date().toISOString(),
    token: `token-${Date.now()}`
  };
  
  res.json({ 
    success: true, 
    message: 'Registration successful',
    driver: driver,
    token: driver.token
  });
});

// Simple bus locations endpoint
app.get('/api/buses/locations', (req, res) => {
  res.json({
    success: true,
    buses: [
      { busNumber: '5K', location: 'Secunderabad', status: 'active' },
      { busNumber: '8A', location: 'Ameerpet', status: 'active' }
    ]
  });
});

app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// For Render deployment - start server without MongoDB requirement
if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚌 RTC Backend running on port ${PORT} (Production)`);
    console.log(`📍 Health check: https://hyderabad-tsrtc-backend.onrender.com`);
  });
} else {
  // Development mode - connect to MongoDB
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rtc-tracking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚌 RTC Backend running on port ${PORT} (Development)`);
      console.log(`📍 Health check: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    // Start server anyway for development
    app.listen(PORT, () => {
      console.log(`🚌 RTC Backend running on port ${PORT} (No Database)`);
    });
  });
}
