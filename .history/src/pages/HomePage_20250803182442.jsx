import image from "./undraw_stars_5pgw.svg";
import axios from '../api/axios';
import { useState } from "react";
export default function HomePage() { 
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const SubmitContactForm = async (name, email, text) => {
        try {
            await axios.post('/contactme/', { name, email, text });
            setMessage('Thank you for your message! We will get back to you as soon as possible.');
            return true;
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    const SubmitContact  = (e) => {
        e.preventDefault();
        if (name && email && text) {
           const setMessage= SubmitContactForm(name, email, text);
           if (!setMessage){
            setError('Message not sent check your internet connection or try again');
        }
        } else {
            setError('All fields are required');
        }
    }
    return (<>
        <nav className="bg-white shadow-md px-6 py-4 flex lg:text-2xl  justify-around items-center">
        <div className="font-bold text-xl">LinkdPlus</div>
        <div className="space-x-6 hidden gap-3 md:flex">
            <a href="#home" className="hover:text-blue-600">Home</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>   
        </div>
        </nav>
        <section
            id="home"
            className="relative min-h-screen flex flex-col md:flex-row items-center justify-evenly px-6 py-16 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden"
            >

            <div className="absolute left-0 top-0 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl -z-10"></div>


            <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="flex justify-center  mb-4">
                <div className="bg-white p-3 rounded-full shadow animate-pulse">
                    <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    >
                    <path d="M17 20h5v-2a4 4 0 0 0-5-3.87" />
                    <path d="M9 20H4v-2a4 4 0 0 1 5-3.87" />
                    <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                </div>

                <h1 className="text-4xl md:text-5xl text-center font-bold text-gray-800 mb-4">
                Welcome to <span className="text-blue-600">LinkdPlus</span>
                </h1>
                <p className="text-lg text-center text-gray-600 mb-6">
                Your modern networking platform. Share posts, engage with professionals, and grow your career.
                </p>
                <div className="flex flex-col sm:flex-row justify-center  gap-4 mb-6">
                <a
                    href="/login"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition"
                >
                    Sign Up
                </a>
                </div>
                <div className="flex flex-wrap gap-6 justify-center  text-gray-700 text-sm mt-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17 8H3V6h14v2zm0 4H3v-2h14v2zm0 4H3v-2h14v2z" />
                    </svg>
                    Post & Connect
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10l3 3L14 7" />
                    </svg>
                    Likes & Dislikes
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a5 5 0 0 1 5 5c0 1.657-.895 3.1-2.24 3.88A7.001 7.001 0 0 1 17 17H3a7.001 7.001 0 0 1 9.24-6.12A4.981 4.981 0 0 1 10 2z" />
                    </svg>
                    User Profiles
                </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center lg:h-100">
                <img
                src={image}
                alt="Networking illustration"
                className="w-80 max-w-full"
                />
            </div>
        </section>
        <section id="about" className="bg-blue-50 gap-3 rounded p-6 mt-6 flex-center flex-col">
            <h2 className="text-2xl font-bold mb-2">About LinkdPlus</h2>
            <p className="text-gray-700  md:text-2xl">
                LinkdPlus is your modern professional networking hub. Connect, share your stories, discover new opportunities, and build your personal brand – all in a privacy-focused, user-driven environment.
            </p>
            <h2> features
            </h2>
            <ul className="list-disc md:text-2xl pl-6">
                <li>
                    User Authentication 
                </li>
                <li>
                    Create / view Posts
                </li>
                <li>
                    Edit / delete posts
                </li>
                <li>
                    like / unlike posts
                </li>
                <li>
                    view / edit user profiles
                </li>
            </ul>
        </section>
    <section id="contact" className="bg-white  flex-center flex-col gap-2 rounded p-6 mt-6 shadow">
        <h2 className="text-2xl font-bold mb-2">Contact Me</h2>
        <form className="space-y-4 ">
            <input type="text" className="input-box" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
            <input type="email" className="input-box" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <textarea className="w-full border rounded p-2" placeholder="Your message" onChange={(e) => setText(e.target.value)} />
            {message &&  <p className="text-blue-400">{message}</p>  }
            {error &&  <p className="text-red-500">{error}</p>  }
            <button onClick = {SubmitContact} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
        <div className="flex space-x-4 mt-4">
        </div>
    </section>
    <footer className="bg-gray-800 text-white mt-8 py-4 text-center">
        <div className="flex justify-center space-x-6 mb-2">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
        </div>
        <div>© 2025 Your Name. All rights reserved.</div>
    </footer>
</> 
)}
