import { useState } from "react";
import { AuthContext } from "./authcontext";
import api from "../api/axios";

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
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  const Register = async (email, password, re_password, first_name, last_name) => {
    try {
      await api.post("/register/", {
        email,
        password,
        re_password,
        first_name,
        last_name,
      });

      // Auto-login after successful registration
      const loggedIn = await Login(email, password);
      if (loggedIn) return true;
      return "Registered but auto-login failed.";
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return (
        err.response?.data?.detail ||
        "Registration failed. Please check your inputs."
      );
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