const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  totalSlots: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Parking", parkingSchema);