import { useContext , useState } from "react";
import  AuthContext  from "../context/authcontext";
import { useNavigate } from "react-router-dom";


export default function Login() { 
    const { Login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // to display error message if login fails
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await Login(email, password);
        if (success) 
            navigate('/');
        else setError('Login failed');
    };
    return (
        <div className="flex justify-center bg-gradient items-center min-h-screen ">
            <form className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-2 border mb-3 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded-md"
        />
        <button onClick={handleSubmit} 
                className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Login
        </button>
      </form>
    </div>
  );



}