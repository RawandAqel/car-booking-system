const express = require("express");
const { getCars, getCarById, addCar, updateCar, deleteCar } = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", authMiddleware, addCar);
router.put("/:id", authMiddleware, updateCar);
router.delete("/:id", authMiddleware, deleteCar);

module.exports = router;
