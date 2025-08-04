export default function Features() {
    
    return (  
      <section id="#features" className="w-full bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            🚀 Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">
                ✍ Create Posts
              </h3>
              <p className="text-gray-600">
                Share your thoughts and ideas with the world in just a few
                clicks.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-pink-500">
                👍 Like & Interact
              </h3>
              <p className="text-gray-600">
                Engage with other users by liking and commenting on their posts.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-orange-500">
                📱 Responsive Design
              </h3>
              <p className="text-gray-600">
                Enjoy a seamless experience on any device – mobile or desktop.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}