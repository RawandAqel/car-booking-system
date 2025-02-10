const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User registration
exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, phone]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0 || !(await bcrypt.compare(password, users[0].password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.execute("SELECT id, name, email, phone FROM users WHERE id = ?", [req.user.id]);
        if (users.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, phone } = req.body;
    try {
        await db.execute("UPDATE users SET name = ?, phone = ? WHERE id = ?", [name, phone, req.user.id]);
        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
