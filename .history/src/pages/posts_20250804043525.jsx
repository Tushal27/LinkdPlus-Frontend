import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ClipLoader } from "react-spinners";

const formatTime = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now - createdDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;

  return createdDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/");
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim() || !newTitle.trim()) return;
    try {
      const res = await api.post("/posts/", { title: newTitle, content: newPost });
      setPosts((prev) => [res.data, ...prev]);
      setNewPost("");
      setNewTitle("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/like/`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, likes_count: res.data.likes_count, dislikes_count: res.data.dislikes_count } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/dislike/`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, likes_count: res.data.likes_count, dislikes_count: res.data.dislikes_count } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

        {/* Profile Card */}

        <div className="hidden md:block w-1/3">
          {profile && (
            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
              <Link to={`/profile/${profile.username}`}>
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-28 relative">
                <img
                  src={`http://127.0.0.1:8000${profile.avatar}`}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                />
              </div>
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-xl font-semibold">{profile.first_name} {profile.last_name}</h2>
                <p className="text-gray-500 text-sm">{profile.bio || "No bio yet"}</p>
                <div className="flex justify-around text-sm mt-4">
                  <p><b>{profile.posts.length}</b> Posts</p>
                </div>
              </div>
              </Link>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          
          {/* Create Post Box */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Create Post</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
              className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-50"
            />
            <button
              onClick={handleCreatePost}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-md hover:from-pink-600 hover:to-purple-600 transition"
            >
              Post
            </button>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="flex justify-center items-center"><ClipLoader size={50} color="#9333ea" /></div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-md mb-5">
                <div className="flex items-center mb-3">
                  <img
                    src={`http://127.0.0.1:8000${post.author_avatar}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-gray-500 text-sm">{formatTime(post.created)}</p>
                  </div>
                </div>
                <h2 className="text-lg font-bold mb-2 text-gray-900">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex gap-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-green-600 hover:scale-110 transition"
                  >
                    👍 {post.likes_count}
                  </button>
                  <button
                    onClick={() => handleDislike(post.id)}
                    className="flex items-center gap-2 text-red-600 hover:scale-110 transition"
                  >
                    👎 {post.dislikes_count}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}