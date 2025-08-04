import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyWebsite
        </h1>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/features" className="hover:underline">
            Features
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-lg bg-purple-800 text-white font-semibold hover:bg-purple-900 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}