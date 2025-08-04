import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ClipLoader } from "react-spinners";
import PostCard from "../components/PostCard";

const Posts = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Left Profile Section */}
        <div className="hidden md:block w-1/3">
          {profile && (
            <div
              className="bg-white p-5 rounded-xl shadow-md text-center cursor-pointer hover:bg-gray-50"
              onClick={() => (window.location.href = "/profile")}
            >
              <img
                src={`http://127.0.0.1:8000${profile.avatar}`}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h2 className="text-xl font-semibold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-gray-500 mb-4">{profile.bio || "No bio yet"}</p>
              <p className="text-sm text-gray-600">
                <b>{profile.posts.length}</b> Posts
              </p>
            </div>
          )}
        </div>

        {/* Right Posts Section */}
        <div className="w-full md:w-2/3">
          {/* Create Post */}
          <div className="bg-white p-5 rounded-xl shadow-md mb-6">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full border rounded-lg p-3 mb-3 focus:ring focus:ring-blue-300 outline-none"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border rounded-lg p-3 resize-none mb-3 focus:ring focus:ring-blue-300 outline-none"
              rows="3"
            />
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Post
            </button>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color="#3b82f6" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;