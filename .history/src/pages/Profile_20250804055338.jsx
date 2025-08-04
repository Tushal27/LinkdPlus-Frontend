import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
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

          <div className="flex gap-6 mt-4 justify-center md:justify-start text-gray-600">
            <p>
              <b>{profile.posts.length}</b> Posts
            </p>
          </div>

          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Recent Work Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Work</h2>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : profile.posts.length > 0 ? (
        profile.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            profileAvatar={profile.avatar}
            canDelete={true}
            onDelete={() => handleDelete(post.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;