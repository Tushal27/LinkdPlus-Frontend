import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthContext from "../context/authcontext";

export default function RegisterPage() {
  const { Register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !rePassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const success = await Register(email, password, rePassword, firstName, lastName);
    setLoading(false);

    if (success === true) {
      navigate("/profile");
    } else {
      // Handle object errors properly
      if (typeof success === 'object' && success !== null) {
        // Extract meaningful error message from the object
        const errorMessage = success.detail || 
                            (success.messages && Object.values(success.messages)[0]) || 
                            "Registration failed";
        setError(errorMessage);
      } else {
        setError(success || "Registration failed");
      }
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
            <h1 className="text-3xl font-bold mb-4">Join Our Community</h1>
            <p className="opacity-80">
              Create an account to connect and explore amazing posts!
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex flex-col justify-center items-center bg-white px-8 py-12 md:py-16 relative">
          <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <h2 className="text-center text-lg text-gray-800 mb-6 font-semibold tracking-wide">
              CREATE ACCOUNT
            </h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mb-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                placeholder="Confirm Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-purple-600 transition flex justify-center items-center"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "SIGN UP"}
            </button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-purple-500 hover:underline">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
