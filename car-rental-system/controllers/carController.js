const db = require("../config/db");

// Get all cars (with filters)
exports.getCars = async (req, res) => {
    try {
        const [cars] = await db.execute("SELECT * FROM cars WHERE availabilityStatus = TRUE");
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get car by ID
exports.getCarById = async (req, res) => {
    try {
        const [cars] = await db.execute("SELECT * FROM cars WHERE id = ?", [req.params.id]);
        if (cars.length === 0) return res.status(404).json({ error: "Car not found" });
        res.json(cars[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new car (Admin-only)
exports.addCar = async (req, res) => {
    const { model, brand, year, pricePerDay } = req.body;
    try {
        await db.execute("INSERT INTO cars (model, brand, year, pricePerDay, availabilityStatus) VALUES (?, ?, ?, ?, TRUE)", 
        [model, brand, year, pricePerDay]);
        res.status(201).json({ message: "Car added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update car details (Admin-only)
exports.updateCar = async (req, res) => {
    const { model, brand, year, pricePerDay, availabilityStatus } = req.body;
    try {
        await db.execute("UPDATE cars SET model=?, brand=?, year=?, pricePerDay=?, availabilityStatus=? WHERE id=?", 
        [model, brand, year, pricePerDay, availabilityStatus, req.params.id]);
        res.json({ message: "Car updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a car (Admin-only)
exports.deleteCar = async (req, res) => {
    try {
        await db.execute("DELETE FROM cars WHERE id = ?", [req.params.id]);
        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
