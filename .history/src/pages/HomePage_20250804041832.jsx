import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-600 to-pink-400">
      {/* ✅ Hero Section */}
      <section className="w-full max-w-6xl text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to Our Platform 🎉
        </h1>
        <p className="text-lg text-white opacity-90 mb-8">
          Connect, share, and explore posts from people all around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
          >
            LOGIN
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            SIGN UP
          </button>
        </div>
      </section>

      <Features  />
      {/* ✅ Footer */}
      <footer className="w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white text-center py-4 mt-6">
        © 2025 LinkdPlus | Designed with ❤
      </footer>
    </div>
    </>
  );
}