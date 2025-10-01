import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import EditProfile from "./pages/EditProfile";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
export default function App() {
  return (<>
      <Routes>
        <Route path="/" element={ <HomePage />}/>
        <Route path="/Features" element={<Features/>} />
        <Route path="/About-Us" element={<AboutUs/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Posts" element={<Posts/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Edit-Profile" element={<EditProfile/>} />
      </Routes>
      </>
  );
}