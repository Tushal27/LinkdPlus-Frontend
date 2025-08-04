import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import CommentDrawer from "../components/CommentDrawer";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [activePostId, setActivePostId] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/");
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}/`);
      setProfile((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/like/`);
      setProfile((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === id
            ? { ...p, likes_count: res.data.likes_count, dislikes_count: res.data.dislikes_count }
            : p
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/dislike/`);
      setProfile((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === id
            ? { ...p, likes_count: res.data.likes_count, dislikes_count: res.data.dislikes_count }
            : p
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10 text-red-500">Failed to load profile</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <img
            src={profile.avatar ? `http://127.0.0.1:8000${profile.avatar}` : "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-gray-600">{profile.email}</p>
            <p className="mt-2 text-gray-700">{profile.bio || "No bio yet"}</p>
            <button
              onClick={() => navigate("/edit-profile")}
              className="mt-3 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex-1 py-2 font-semibold ${
              activeTab === "personal" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-2 font-semibold ${
              activeTab === "posts" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
            }`}
          >
            My Posts
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "personal" && (
          <div className="space-y-3">
            <p>
              <b>First Name:</b> {profile.first_name}
            </p>
            <p>
              <b>Last Name:</b> {profile.last_name}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            <p>
              <b>Bio:</b> {profile.bio || "No bio provided"}
            </p>
            <p>
              <b>Total Posts:</b> {profile.posts.length}
            </p>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-4">
            {profile.posts.length === 0 ? (
              <p className="text-gray-500 text-center">No posts yet.</p>
            ) : (
              profile.posts.map((post) => (
                <div key={post.id} className="bg-gray-50 p-4 rounded-xl shadow">
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      👍 {post.likes_count}
                    </button>
                    <button
                      onClick={() => handleDislike(post.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      👎 {post.dislikes_count}
                    </button>
                    <button
                      onClick={() => setActivePostId(post.id)}
                      className="text-blue-600 hover:underline ml-3"
                    >
                      💬 Comments
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="ml-auto text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Comment Drawer */}
      {activePostId && (
        <CommentsDrawer postId={activePostId} onClose={() => setActivePostId(null)} />
      )}
    </div>
  );
}