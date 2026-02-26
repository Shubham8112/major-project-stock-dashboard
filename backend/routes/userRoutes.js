const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/userController");

router.post("/watchlist", protect, addToWatchlist);
router.get("/watchlist", protect, getWatchlist);
router.delete("/watchlist/:symbol", protect, removeFromWatchlist);

module.exports = router;