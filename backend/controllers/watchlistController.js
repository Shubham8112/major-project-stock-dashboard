const User = require("../models/User");

const addToWatchlist = async (req, res) => {
    const { symbol } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.watchlist.includes(symbol)) {
        user.watchlist.push(symbol);
        await user.save();
    }

    res.json({ watchlist: user.watchlist });
};

const removeFromWatchlist = async (req, res) => {
    const { symbol } = req.body;

    const user = await User.findById(req.user.id);

    user.watchlist = user.watchlist.filter(s => s !== symbol);

    await user.save();

    res.json({ watchlist: user.watchlist });
};

const getWatchlist = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user.watchlist);
};

module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlist
};