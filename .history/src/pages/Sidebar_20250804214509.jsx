import { Home, User, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 p-4 border-r h-screen fixed bg-white">
        <Link to="/" className="mb-4 font-bold text-xl">Linkd+</Link>
        <Link to="/" className="mb-4 flex items-center gap-2"><Home size={20} />Home</Link>
        <Link to="/profile" className="mb-4 flex items-center gap-2"><User size={20} />Profile</Link>
        <Link to="/create" className="mb-4 flex items-center gap-2"><PlusCircle size={20} />Post</Link>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 justify-around z-50">
        <Link to="/"><Home size={24} /></Link>
        <Link to="/create"><PlusCircle size={24} /></Link>
        <Link to="/profile"><User size={24} /></Link>
      </div>
    </>
  );
}