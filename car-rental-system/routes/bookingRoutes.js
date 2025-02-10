const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {createBooking,getAllBookings,getBookingById,cancelBooking} = require("../controllers/bookingController"); 

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getAllBookings);
router.get("/:id", authMiddleware, getBookingById);
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;
