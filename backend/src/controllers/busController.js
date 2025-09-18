const Bus = require('../models/Bus');
const Driver = require('../models/Driver');

// POST /api/buses/update-location
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const driverId = req.user.id;
    let bus = await Bus.findOne({ driver: driverId });
    if (!bus) return res.status(404).json({ message: 'Bus not found for this driver' });
    bus.location = { lat, lng, updatedAt: new Date() };
    await bus.save();
    res.json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/buses/locations
exports.getAllBusLocations = async (req, res) => {
  try {
    const buses = await Bus.find({}, 'number location').populate('driver', 'name');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
