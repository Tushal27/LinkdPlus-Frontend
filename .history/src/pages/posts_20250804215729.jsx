import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ClipLoader } from "react-spinners";
import PostCard from "../components/PostCard"; 
import CommentsDrawer from "../components/CommentsDrawer"; 
import Layout from "./Layout";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); // ✅ Track which post comments are open

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await api.get("/profile/");
        setProfile(resProfile.data);
        const resPosts = await api.get("/posts/");
        setPosts(resPosts.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreatePost = async () => {
    if (!newTitle.trim() || !newPost.trim()) return;
    try {
      const res = await api.post("/posts/", { title: newTitle, content: newPost });
      setPosts((prev) => [res.data, ...prev]);
      setNewTitle("");
      setNewPost("");
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
    <Layout> 
    <div className="min-h-screen  bg-gradient-to-r from-purple-600 to-pink-400 p-10 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        
        {/* Left Profile */}
        <div className="hidden md:block w-1/3">
          {profile && (
            <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-lg text-center">
              <img
                src={`${profile.avatar}`}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
              />
              <h2 className="text-xl font-bold text-white">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-gray-200 mb-4">{profile.bio || "No bio yet"}</p>
              <p className="text-gray-100 font-semibold">{profile.posts.length} Posts</p>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          {/* Create Post */}
          <div className="bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-lg mb-6">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full border rounded-lg p-3 mb-3 focus:ring focus:ring-purple-400 outline-none"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border rounded-lg p-3 resize-none mb-3 focus:ring focus:ring-purple-400 outline-none"
              rows="3"
            />
            <button
              onClick={handleCreatePost}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Post
            </button>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color="#fff" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                handleLike={handleLike}
                handleDislike={handleDislike}
                setSelectedPost={setSelectedPost} // ✅ pass function
              />
            ))
          ) : (
            <p className="text-center text-white">No posts yet.</p>
          )}
        </div>
      </div>

      {/* ✅ Single Comment Drawer */}
      {selectedPost && (
        <CommentsDrawer
          postId={selectedPost}
          onClose={() => setSelectedPost(null)} // ✅ close drawer
        />
      )}
    </div>
    </Layout>
  );
}