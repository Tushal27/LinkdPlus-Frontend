import React from 'react';
import { Home, User, Plus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const { Logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
    navigate('/');
  };

  return (
    <div className="fixed bottom-0 w-full lg:top-0 lg:bottom-auto lg:left-0 lg:h-screen lg:w-60 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-500 text-white z-50 flex lg:flex-col justify-around lg:justify-start items-center lg:items-start p-2 lg:py-6 space-x-4 lg:space-x-0 lg:space-y-6">
      
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Home size={20} />
        <span className="hidden lg:block text-md font-medium">Home</span>
      </Link>

      <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
        <User size={20} />
        <span className="hidden lg:block text-md font-medium">Profile</span>
      </Link>



      <button
        onClick={handleLogout}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        <LogOut size={20} />
        <span className="hidden lg:block text-md font-medium">Logout</span>
      </button>

    </div>
  );
}