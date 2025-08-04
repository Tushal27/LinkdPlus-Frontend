import { useContext, useState } from "react";
import AuthContext from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { Register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.password ||
      !formData.re_password ||
      !formData.first_name ||
      !formData.last_name
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.re_password) {
      setError("Passwords do not match.");
      return;
    }

    const result = await Register(
      formData.email,
      formData.password,
      formData.re_password,
      formData.first_name,
      formData.last_name
    );

    if (result === true) {
      navigate("/profile");
    } else {
      // Show exact error from backend
      const errorMsg =
        result?.email?.[0] ||
        result?.password?.[0] ||
        result?.re_password?.[0] ||
        result?.first_name?.[0] ||
        result?.last_name?.[0] ||
        result?.detail ||
        "Registration failed.";
      setError(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="password"
          name="re_password"
          placeholder="Confirm Password"
          value={formData.re_password}
          onChange={handleChange}
          className="input-box"
        />

        <button
          type="submit"
          className="w-full font-bold bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <div className="mt-2 flex gap-3 pl-1">
          <label>Already have an account?</label>
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}