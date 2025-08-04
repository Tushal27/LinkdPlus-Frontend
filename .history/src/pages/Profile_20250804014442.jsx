import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user's profile (includes posts)
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

  // ✅ Like Post
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
      console.error("Like failed:", err);
    }
  };

  // ✅ Dislike Post
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
      console.error("Dislike failed:", err);
    }
  };

  // ✅ Delete Post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${id}/`);
      setProfile((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Format time like "Just now", "5 min ago", or date
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = (now - date) / 1000; // in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center text-red-500">Failed to load profile.</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

        {/* ✅ Left Profile Card */}
        <div className="hidden md:block w-1/3">
          <div className="bg-white p-5 rounded-xl shadow-md text-center">
            <img
              src={`http://127.0.0.1:8000${profile.avatar}`}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-xl font-semibold">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-gray-500 mb-4">{profile.bio || "No bio yet"}</p>

            <div className="flex justify-around text-sm text-gray-600">
              <p><b>{profile.posts.length}</b> Posts</p>
              <p><b>{profile.followers || 0}</b> Followers</p>
              <p><b>{profile.following || 0}</b> Following</p>
            </div>
          </div>
        </div>

        {/* ✅ Posts Section - SAME as Posts.jsx */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-4">My Posts</h2>

          {profile.posts.length > 0 ? (
            profile.posts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-xl shadow-md mb-5">
                <div className="flex items-center mb-3">
                  <img
                    src={`http://127.0.0.1:8000${post.author_avatar}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{post.author_name}</p>
                    <p className="text-gray-500 text-sm">{formatTime(post.created)}</p>
                  </div>
                </div>

                <h2 className="text-gray-800 mb-4 font-bold">{post.title}</h2>
                <p className="text-gray-800 mb-4">{post.content}</p>

                <div className="flex gap-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                  >
                    👍 {post.likes_count}
                  </button>

                  <button
                    onClick={() => handleDislike(post.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    👎 {post.dislikes_count}
                  </button>

                  {/* ✅ Delete Button (Only for Own Posts) */}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;