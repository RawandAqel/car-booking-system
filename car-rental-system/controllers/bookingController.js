const db = require("../config/db");

exports.createBooking = async (req, res) => {
    try {
        const { carId, startDate, endDate, totalPrice } = req.body;
        const userId = req.user.id;

        await db.query(
            "INSERT INTO Bookings (userId, carId, startDate, endDate, totalPrice, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())",
            [userId, carId, startDate, endDate, totalPrice]
        );

        res.status(201).json({ message: "Booking created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating booking" });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Bookings");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving bookings" });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Bookings WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving booking" });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Bookings WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }

        await db.query("DELETE FROM Bookings WHERE id = ?", [id]);

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error canceling booking" });
    }
};
