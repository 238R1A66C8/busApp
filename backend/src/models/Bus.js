const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model('Bus', busSchema);
