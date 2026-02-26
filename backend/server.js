const express = require("express");
const cors = require("cors");
require("dotenv").config();

const protect = require("./middleware/authMiddleware");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stocks", require("./routes/stockRoutes"));
app.use("/api/watchlist", require("./routes/watchlistRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

const adminOnly = require("./middleware/adminMiddleware");
// const protect = require("./middleware/authMiddleware");

app.get("/api/admin", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin 👑"
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});