import { useState } from "react";
import API from "../services/api";

const DashboardPage = () => {

    const [symbol, setSymbol] = useState("");
    const [stock, setStock] = useState(null);
    const [quantity, setQuantity] = useState("");

    const fetchStock = async () => {
        const res = await API.get(`/stocks/${symbol}`);
        setStock(res.data);
    };

    const handleTransaction = async (type) => {
        if (!quantity) {
            alert("Enter quantity");
            return;
        }

        try {
            await API.post("/transactions", {
                symbol: stock.symbol,
                type,
                quantity: Number(quantity)
            });

            alert(`${type.toUpperCase()} request submitted`);
            setQuantity("");

        } catch (error) {
            alert(error.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div className="p-6">

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter symbol (AAPL)"
                    className="border p-2 rounded"
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <button 
                    onClick={fetchStock}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {stock && (
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow space-y-4">

                    <h2 className="text-xl font-bold">{stock.name}</h2>

                    <p>Price: ${stock.price}</p>
                    <p>High: ${stock.high}</p>
                    <p>Low: ${stock.low}</p>
                    <p>Change: {stock.changePercent}%</p>

                    <div className="mt-4 flex gap-4 items-center">

                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border p-2 rounded w-32"
                        />

                        <button
                            onClick={() => handleTransaction("buy")}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Buy
                        </button>

                        <button
                            onClick={() => handleTransaction("sell")}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sell
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};

export default DashboardPage;