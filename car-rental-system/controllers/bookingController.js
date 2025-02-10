const db = require("../config/db");

// Create a new booking
exports.createBooking = async (req, res) => {
    const { carId, startDate, endDate, totalPrice } = req.body;
    try {
        await db.execute("INSERT INTO bookings (userId, carId, startDate, endDate, totalPrice, status) VALUES (?, ?, ?, ?, ?, 'pending')", 
        [req.user.id, carId, startDate, endDate, totalPrice]);
        res.status(201).json({ message: "Booking created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
