import { useEffect, useState } from "react";
import API from "../services/api";

const AdminPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions/admin/all");
      setTransactions(res.data);
    } catch (err) {
      setMessage("Not authorized or error loading data");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/transactions/admin/${id}`, { status });
      setMessage(`Transaction ${status}`);
      fetchTransactions();
    } catch (err) {
      setMessage("Error updating transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Panel 👑
        </h1>

        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        <div className="bg-white rounded shadow p-4">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td className="p-2 border">{tx.user?.name}</td>
                  <td className="p-2 border">{tx.symbol}</td>
                  <td className="p-2 border capitalize">{tx.type}</td>
                  <td className="p-2 border">{tx.quantity}</td>
                  <td className="p-2 border capitalize">{tx.status}</td>
                  <td className="p-2 border space-x-2">
                    {tx.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(tx._id, "approved")
                          }
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(tx._id, "rejected")
                          }
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default AdminPage;