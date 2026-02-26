import { useEffect, useState } from "react";
import API from "../services/api";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      setMessage("Error loading transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          My Transactions 📋
        </h1>

        {message && (
          <p className="text-red-500 text-center mb-4">{message}</p>
        )}

        <div className="bg-white rounded shadow p-4">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td className="p-2 border">{tx.symbol}</td>
                  <td className="p-2 border capitalize">
                    {tx.type}
                  </td>
                  <td className="p-2 border">{tx.quantity}</td>
                  <td
                    className={`p-2 border capitalize ${
                      tx.status === "approved"
                        ? "text-green-600"
                        : tx.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {tx.status}
                  </td>
                  <td className="p-2 border">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default TransactionHistoryPage;