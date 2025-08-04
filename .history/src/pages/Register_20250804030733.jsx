import { useContext, useState } from "react";
import AuthContext from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { Register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !rePassword || !first_name || !last_name) {
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

    const result = await Register(
      email,
      password,
      rePassword,
      first_name,
      last_name
    );

    if (result === true) {
      navigate("/profile"); // Redirect to profile after auto-login
    } else {
      setError(result); // Show backend error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient">
      <form
        className="bg-white p-6 rounded-xl shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
          required
        />

        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className="input-box"
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className="input-box"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="input-box"
          required
        />

        <button
          type="submit"
          className="w-full font-bold bg-blue-700 text-white p-2 rounded"
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