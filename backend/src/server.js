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
    'http://192.168.0.155:3000', 'http://192.168.0.155:3001', 'http://192.168.0.155:3002'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'RTC Bus Tracking API is running!' });
});

app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));
