const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    parkingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parking",
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true
    },

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);