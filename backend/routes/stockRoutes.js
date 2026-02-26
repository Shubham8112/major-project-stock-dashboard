const express = require("express");
const { getStockData, getHistoricalData } = require("../controllers/stockController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// 🔥 Specific route FIRST
router.get("/:symbol/history", protect, getHistoricalData);

// 🔥 Generic route AFTER
router.get("/:symbol", protect, getStockData);

module.exports = router;