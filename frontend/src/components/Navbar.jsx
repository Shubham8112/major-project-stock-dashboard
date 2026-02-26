import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      {/* Left Section */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-xl font-bold">
          StockApp 📈
        </Link>

        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/transactions" className="hover:text-gray-300">
          Transactions
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;