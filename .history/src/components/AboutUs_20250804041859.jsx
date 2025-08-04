import React from "react";

export default function AboutUs() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-pink-400 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg opacity-90 mb-10 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold">MyWebsite</span>!  
          We are passionate about building a platform where people can connect, share, and express freely.  
          Our mission is to create a seamless and interactive experience for every user by combining  
          modern design with powerful features.  
        </p>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-md shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🌟 Our Vision</h3>
            <p className="opacity-80">
              To be a leading platform where creativity meets community.  
              We aim to make sharing and connecting easier for everyone.
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-md shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🚀 Our Mission</h3>
            <p className="opacity-80">
              To empower users with tools to share ideas, collaborate, and grow together  
              in a vibrant and positive online environment.
            </p>
          </div>

          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-md shadow-lg">
            <h3 className="text-xl font-semibold mb-3">🤝 Our Values</h3>
            <p className="opacity-80">
              We value trust, simplicity, and innovation.  
              Every feature is built to enhance user experience and community growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}