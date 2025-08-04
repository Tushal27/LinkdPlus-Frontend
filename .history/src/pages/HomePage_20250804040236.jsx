import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-pink-400 p-6">
      <div className="w-full max-w-4xl bg-white bg-opacity-0 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Welcome Section */}
        <div className="hidden md:flex flex-col justify-center px-10 py-16 bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 text-white relative">
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <rect x="40" y="40" width="40" height="140" rx="20" fill="#FF9462" opacity="0.5"/>
              <rect x="120" y="70" width="20" height="80" rx="10" fill="#FFB678" opacity="0.6"/>
              <rect x="200" y="180" width="50" height="130" rx="20" fill="#FF9462" opacity="0.5"/>
              <rect x="300" y="130" width="20" height="120" rx="10" fill="#FFC987" opacity="0.4"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform 🎉</h1>
            <p className="opacity-90 text-lg">
              Connect, share, and explore posts from people all around the world.
            </p>
          </div>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex flex-col justify-center items-center bg-white px-8 py-12 md:py-16 relative text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Started</h2>
          <p className="text-gray-600 mb-8">
            Join our community to create posts, like, and interact with others.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 mb-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            SIGN UP
          </button>
        </div>
      </div>

      <footer className="absolute bottom-2 left-0 right-0 text-center text-sm text-white opacity-70">
        © 2025 Your Website. Designed with ❤
      </footer>
    </div>
  );
}