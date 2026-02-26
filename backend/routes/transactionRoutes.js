const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createTransaction,
    getUserTransactions,
    getAllTransactions,
    updateTransactionStatus
} = require("../controllers/transactionController");

const router = express.Router();

// User routes
router.post("/", protect, createTransaction);
router.get("/", protect, getUserTransactions);

// Admin routes
router.get("/admin/all", protect, adminOnly, getAllTransactions);
router.put("/admin/:id", protect, adminOnly, updateTransactionStatus);

module.exports = router;