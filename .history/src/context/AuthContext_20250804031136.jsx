import { useState, useEffect } from "react";
import { AuthContext } from "./authcontext";
import api from "../api/axios";
import jwtDecode from "jwt-decode";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage if token exists
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ email: decoded.email });
      } catch {
        setUser(null);
      }
    }
  }, []);

  // 🔹 Auto-refresh token every 4 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 4 * 60 * 1000); // 4 minutes

    return () => clearInterval(interval);
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return;

    try {
      const res = await api.post("/token/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);
    } catch (err) {
      console.error("Token refresh failed:", err);
      Logout();
    }
  };

  const Login = async (email, password) => {
    try {
      const res = await api.post("/login/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const decoded = jwtDecode(res.data.access);
      setUser({ email: decoded.email });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const Register = async (email, password, re_password, first_name, last_name) => {
    try {
      await api.post("/register/", { email, password, re_password, first_name, last_name });
      await Login(email, password);
      return true;
    } catch (error) {
      if (error.response?.data) {
        const messages = Object.entries(error.response.data)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(", ") : msg}`)
          .join("\n");
        return messages;
      }
      return "Something went wrong. Try again.";
    }
  };

  const Logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}