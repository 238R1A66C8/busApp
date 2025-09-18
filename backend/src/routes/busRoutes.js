const express = require('express');
const { authenticateDriver } = require('../middleware/authMiddleware');
const { updateLocation, getAllBusLocations } = require('../controllers/busController');

const router = express.Router();

// Driver updates bus location
router.post('/update-location', authenticateDriver, updateLocation);

// Get all bus locations (for frontend map)
router.get('/locations', getAllBusLocations);

module.exports = router;
