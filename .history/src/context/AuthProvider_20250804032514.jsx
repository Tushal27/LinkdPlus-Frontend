import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import api from "../api/axios";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const Login = async (email, password) => {
    try {
      const res = await api.post("/login/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setUser({ email });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const Register = async (email, password, re_password, first_name, last_name) => {
    try {
      await api.post("/register/", { email, password, re_password, first_name, last_name });
      await Login(email, password); // Auto login
      return true;
    } catch (err) {
      return err.response?.data || { detail: "Something went wrong" };
    }
  };

  const Logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  // 🔹 Auto Refresh Token Function
  const refreshAccessToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return Logout();

      const res = await api.post("/token/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);
    } catch (err) {
      console.log("Failed to refresh token:", err);
      Logout();
    }
  };

  // 🔹 Check every 4 minutes (or before expiry)
  useEffect(() => {
    const interval = setInterval(() => {
      const access = localStorage.getItem("access");
      if (!access) return;

      try {
        const decoded = jwtDecode(access);
        if (decoded.exp * 1000 < Date.now() + 60000) {
          refreshAccessToken();
        }
      } catch {
        refreshAccessToken();
      }
    }, 4 * 60 * 1000); // every 4 mins

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}