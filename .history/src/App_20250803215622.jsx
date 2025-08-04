import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
export default function App() {
  return (
      <Routes>
        <Route path="/" element={ <HomePage />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Posts" element={<Posts/>} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
  );
}