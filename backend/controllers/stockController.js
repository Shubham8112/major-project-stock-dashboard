const axios = require("axios");

const getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;

        const response = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`
        );

        if (response.data.code) {
            return res.status(400).json({
                message: response.data.message
            });
        }

        const stock = response.data;

        res.json({
            symbol: stock.symbol,
            name: stock.name,
            price: stock.close,
            high: stock.high,
            low: stock.low,
            previousClose: stock.previous_close,
            changePercent: stock.percent_change
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getHistoricalData = async (req, res) => {
    try {
        const { symbol } = req.params;

        const response = await axios.get(
            `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=7&apikey=${process.env.STOCK_API_KEY}`
        );

        if (response.data.code) {
            return res.status(400).json({
                message: response.data.message
            });
        }

        const formatted = response.data.values.map(item => ({
            date: item.datetime,
            close: item.close
        }));

        res.json(formatted.reverse());

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getStockData ,getHistoricalData};