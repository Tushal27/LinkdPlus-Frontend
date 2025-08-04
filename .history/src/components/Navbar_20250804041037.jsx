import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 shadow-lg">
      <div className=" max-w-7xl mx-auto flex items-center justify-around">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          LinkdPLus
        </h1>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-white font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/#about" className="hover:underline">
            About
          </Link>
          <Link to="/#features" className="hover:underline">
            Features
          </Link>
        </div>
        </div>
    </nav>
  );
}