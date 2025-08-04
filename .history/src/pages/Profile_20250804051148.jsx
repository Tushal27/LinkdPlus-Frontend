import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const formatTime = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now - createdDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;

    return createdDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    api.get("/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={`http://127.0.0.1:8000${profile.avatar}`}
          alt="Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-gray-500">{profile.email}</p>
          <p className="mt-2 text-gray-700">{profile.bio || "No bio yet"}</p>
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "info" ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "posts" ? "border-b-4 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            My Posts ({profile.posts.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === "info" && (
            <div>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>First Name:</strong> {profile.first_name}</p>
              <p><strong>Last Name:</strong> {profile.last_name}</p>
              <p><strong>Bio:</strong> {profile.bio || "No bio provided."}</p>
            </div>
          )}

          {activeTab === "posts" && (
            profile.posts.length > 0 ? (
              profile.posts.map((post) => (
                <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow mb-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={`http://127.0.0.1:8000${profile.avatar}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{profile.first_name} {profile.last_name}</p>
                      <p className="text-gray-500 text-sm">{formatTime(post.created)}</p>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <p className="text-gray-700 mb-3">{post.content}</p>

                  <div className="flex gap-4">
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
                      onClick={() => handleDelete(post.id)}
                      className="ml-auto text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}