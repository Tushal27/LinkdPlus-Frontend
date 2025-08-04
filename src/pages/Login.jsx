
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await Login(email, password);
    setLoading(false);

    if (success) {
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-400 p-6">
      <div className="w-full max-w-4xl bg-white bg-opacity-0 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
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
            <h1 className="text-3xl font-bold mb-4">Welcome to LinkdPLus</h1>
            <p className="opacity-80">
              linkplus is a social media platform for professionals.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center bg-white px-8 py-12 md:py-16 relative">
          <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <h2 className="text-center text-lg text-gray-800 mb-6 font-semibold tracking-wide">
              USER LOGIN
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mb-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox rounded text-purple-500" />
                <span className="ml-2">Remember</span>
              </label>
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition flex justify-center items-center"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
      <footer className="absolute bottom-2 left-0 right-0 text-center text-sm text-white opacity-70">
        designed by Tushal
      </footer>
    </div>
  );
}