import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";
import api from "../api/axios";

export default function HomePage() {
  const navigate = useNavigate();

  // ✅ Auto redirect if logged in
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
      navigate("/posts");
    }
  }, [navigate]);

  // ✅ Contact form state
  const [form, setForm] = useState({ name: "", email: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await api.post("/contactme/", form);
      if (res.status === 201 || res.status === 200) {
        setSuccess("✅ Message sent successfully!");
        setForm({ name: "", email: "",text: "" });
      }
    } catch (err) {
      console.error(err);
      setSuccess("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-600 to-pink-400">
        
        {/* Hero Section */}
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

        <AboutUs />
        <Features />

        {/* ✅ Contact Me Section */}
        <section className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mt-10 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📩 Contact Me
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Have any questions or suggestions? Feel free to reach out!
          </p>
          {success && (
            <p
              className={`text-center mb-4 font-semibold ${
                success.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <textarea
              name="message"
              value={form.text}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gradient-to-r from-purple-700 to-pink-500 text-white text-center py-4 mt-6">
          © 2025 LinkdPlus | Designed with ❤
        </footer>
      </div>
    </>
  );
}