const User = require("../models/User");

// ADD
const addToWatchlist = async (req, res) => {
  const { symbol } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.watchlist.includes(symbol)) {
    user.watchlist.push(symbol);
    await user.save();
  }

  res.json(user.watchlist);
};

// GET
const getWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.watchlist);
};

// REMOVE
const removeFromWatchlist = async (req, res) => {
  const { symbol } = req.params;

  const user = await User.findById(req.user._id);

  user.watchlist = user.watchlist.filter(
    (item) => item !== symbol
  );

  await user.save();

  res.json(user.watchlist);
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};