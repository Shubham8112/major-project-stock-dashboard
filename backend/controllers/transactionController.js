const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
    const { symbol, type, quantity } = req.body;

    const transaction = await Transaction.create({
        user: req.user.id,
        symbol,
        type,
        quantity
    });

    res.status(201).json(transaction);
};

const getUserTransactions = async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
};

const getAllTransactions = async (req, res) => {
    const transactions = await Transaction.find()
        .populate("user", "name email role");

    res.json(transactions);
};

const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
        return res.status(404).json({
            message: "Transaction not found"
        });
    }

    transaction.status = status;
    await transaction.save();

    res.json({
        message: `Transaction ${status} successfully`,
        transaction
    });
};

module.exports = {
    createTransaction,
    getUserTransactions,
    getAllTransactions,
    updateTransactionStatus
};