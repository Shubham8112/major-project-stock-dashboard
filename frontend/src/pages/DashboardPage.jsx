import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Watchlist from "../components/Watchlist";

const DashboardPage = () => {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);
  const [history, setHistory] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const fetchStock = async () => {
    if (!symbol) {
      setMessage("Enter stock symbol");
      return;
    }

    try {
      setMessage("");
      setStock(null);
      setHistory([]);

      const stockRes = await API.get(`/stocks/${symbol}`);
      setStock(stockRes.data);

      const historyRes = await API.get(`/stocks/${symbol}/history`);
      setHistory(historyRes.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching stock");
    }
  };

  const handleTransaction = async (type) => {
    if (!quantity || !stock) {
      setMessage("Please enter quantity");
      return;
    }

    try {
      await API.post("/transactions", {
        symbol: stock.symbol,
        type,
        quantity: Number(quantity),
      });

      setMessage(
        `${type.toUpperCase()} request submitted (Pending approval)`
      );
      setQuantity("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Transaction failed"
      );
    }
  };

  const addToWatchlist = async () => {
    if (!stock) return;

    try {
      await API.post("/users/watchlist", {
        symbol: stock.symbol,
      });
      setMessage("Added to watchlist ⭐");
    } catch (err) {
      setMessage("Already in watchlist or error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Stock Dashboard 📈
          </h1>

          <Link
            to="/transactions"
            className="text-blue-600 underline"
          >
            View My Transactions
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter stock symbol (AAPL)"
            value={symbol}
            onChange={(e) =>
              setSymbol(e.target.value.toUpperCase())
            }
            className="flex-1 p-2 border rounded"
          />

          <button
            onClick={fetchStock}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-red-500 mb-4">
            {message}
          </p>
        )}

        {/* Stock Info */}
        {stock && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-bold mb-2">
              {stock.name} ({stock.symbol})
            </h2>
            <p>Price: ${stock.price}</p>
            <p>High: ${stock.high}</p>
            <p>Low: ${stock.low}</p>
            <p>Change: {stock.changePercent}%</p>

            <button
              onClick={addToWatchlist}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
            >
              ⭐ Add to Watchlist
            </button>
          </div>
        )}

        {/* Buy / Sell */}
        {stock && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Trade Stock
            </h3>

            <div className="flex gap-4 items-center">
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 border rounded w-32"
              />

              <button
                onClick={() => handleTransaction("buy")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Buy
              </button>

              <button
                onClick={() => handleTransaction("sell")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Sell
              </button>
            </div>
          </div>
        )}

        {/* Historical Data */}
        {history.length > 0 && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Last 7 Days Closing Prices
            </h3>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Close</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      {item.date}
                    </td>
                    <td className="p-2 border">
                      ${item.close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Watchlist Section */}
        <Watchlist />

      </div>
    </div>
  );
};

export default DashboardPage;