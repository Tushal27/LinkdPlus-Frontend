import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
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

      {/* ✅ About Section */}
      <section className="w-full bg-white py-16 px-6 rounded-t-3xl shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our platform allows users to create posts, like, and interact with a
            vibrant community. Whether you're here to share ideas or explore
            content, we provide a modern and engaging experience.
          </p>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="w-full bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            🚀 Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">
                ✍ Create Posts
              </h3>
              <p className="text-gray-600">
                Share your thoughts and ideas with the world in just a few
                clicks.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-pink-500">
                👍 Like & Interact
              </h3>
              <p className="text-gray-600">
                Engage with other users by liking and commenting on their posts.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-orange-500">
                📱 Responsive Design
              </h3>
              <p className="text-gray-600">
                Enjoy a seamless experience on any device – mobile or desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white text-center py-4 mt-6">
        © 2025 Your Website | Designed with ❤
      </footer>
    </div>
  );
}