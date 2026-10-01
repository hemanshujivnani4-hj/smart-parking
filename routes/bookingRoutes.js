const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Parking = require("../models/Parking");

// GET all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE a new booking
router.post("/", async (req, res) => {
    try {
        const {
            parkingId,
            customerName,
            vehicleNumber,
            startTime,
            endTime,
            amount
        } = req.body;

        const parking = await Parking.findById(parkingId);

        if (!parking) {
            return res.status(404).json({
                message: "Parking location not found"
            });
        }

        if (parking.availableSlots <= 0) {
            return res.status(400).json({
                message: "No parking slots available"
            });
        }

        const booking = new Booking({
            parkingId,
            customerName,
            vehicleNumber,
            startTime,
            endTime,
            amount
        });

        const savedBooking = await booking.save();

        parking.availableSlots -= 1;
        await parking.save();

        res.status(201).json(savedBooking);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// CANCEL a booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    const parking = await Parking.findById(booking.parkingId);

    if (parking) {
      parking.availableSlots += 1;
      await parking.save();
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;