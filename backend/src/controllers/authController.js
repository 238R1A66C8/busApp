const Driver = require('../models/Driver');
const Bus = require('../models/Bus');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.driverRegister = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    
    // Validate required fields
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Please provide name, phone, and password' });
    }

    // Check if driver already exists
    let driver = await Driver.findOne({ phone });
    if (driver) {
      return res.status(400).json({ message: 'Driver with this phone number already exists' });
    }

    // Hash password and create driver
    const hashedPassword = await bcrypt.hash(password, 10);
    driver = new Driver({ 
      name: name.trim(), 
      phone: phone.trim(), 
      password: hashedPassword 
    });
    
    await driver.save();

    // Generate JWT token
    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      message: 'Driver registered successfully',
      token,
      driver: {
        id: driver._id,
        name: driver.name,
        phone: driver.phone
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// POST /api/auth/login
exports.driverLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // Validate required fields
    if (!phone || !password) {
      return res.status(400).json({ message: 'Please provide phone and password' });
    }

    // Find driver
    const driver = await Driver.findOne({ phone: phone.trim() });
    if (!driver) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      message: 'Login successful',
      token,
      driver: {
        id: driver._id,
        name: driver.name,
        phone: driver.phone
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
