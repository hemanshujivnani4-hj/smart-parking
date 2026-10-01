const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const parkingRoutes = require("./routes/parkingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "routes", "public")));

app.use("/api/parking", parkingRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "routes", "public", "index.html"));
});

const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });