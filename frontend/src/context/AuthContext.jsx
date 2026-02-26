import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // Persist token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // LOGIN
  const login = async (email, password) => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    setToken(res.data.token);
    setUser(res.data.user); // make sure backend sends user object
  };

  // SIGNUP
  const signup = async (name, email, password) => {
    const res = await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    setToken(res.data.token);
    setUser(res.data.user);
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};