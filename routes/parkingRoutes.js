const express = require("express");
const router = express.Router();

const Parking = require("../models/Parking");

// GET all parking locations
router.get("/", async (req, res) => {
  try {
    const parking = await Parking.find();
    res.json(parking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new parking location
router.post("/", async (req, res) => {
  try {
    const parking = new Parking(req.body);
    const savedParking = await parking.save();

    res.status(201).json(savedParking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;