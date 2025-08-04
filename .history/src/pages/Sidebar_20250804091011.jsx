import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, User, LogOut } from "lucide-react";
import AuthContext from "../context/AuthContext";

export default function Sidebar() {
  const { Logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Posts", path: "/posts", icon: <FileText size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white flex flex-col shadow-xl">
      {/* Logo Section */}
      <div className="p-5 text-2xl font-bold tracking-wide border-b border-white/30">
        MyApp
      </div>

      {/* Menu Items */}
      <div className="flex flex-col flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition ${
              location.pathname === item.path
                ? "bg-white/30 shadow-md"
                : "hover:bg-white/20"
            }`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
           onClick={async () => {
            await Logout();
            navigate("/login");
          }}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}