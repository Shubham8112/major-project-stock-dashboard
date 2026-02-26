import { useEffect, useState } from "react";
import API from "../services/api";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    const res = await API.get("/users/watchlist");
    setWatchlist(res.data);
  };

  const removeStock = async (symbol) => {
    await API.delete(`/users/watchlist/${symbol}`);
    fetchWatchlist();
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">
        ⭐ My Watchlist
      </h3>

      {watchlist.length === 0 ? (
        <p>No stocks added</p>
      ) : (
        <ul>
          {watchlist.map((symbol, index) => (
            <li
              key={index}
              className="flex justify-between border-b py-2"
            >
              {symbol}

              <button
                onClick={() => removeStock(symbol)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;