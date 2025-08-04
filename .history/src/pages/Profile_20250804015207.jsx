import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/");
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };



  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${id}/`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/like/`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes_count: res.data.likes_count,
                dislikes_count: res.data.dislikes_count,
              }
            : p
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
          p.id === id
            ? {
                ...p,
                likes_count: res.data.likes_count,
                dislikes_count: res.data.dislikes_count,
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={ `http://127.0.0.1:8000${profile.avatar}`}
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
            <p>
              <b>{profile.followers || 0}</b> Followers
            </p>
            <p>
              <b>{profile.following || 0}</b> Following
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Work
      </h2>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : profile.posts.length > 0 ? (
        profile.posts
          .map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-xl shadow-md mb-5"
            >
              <div className="flex items-center mb-3">
                <img
                  src={ `http://127.0.0.1:8000${profile.avatar}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">
                    {post.author_name || `${profile.first_name} ${profile.last_name}`}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.created).toLocaleString()}
                  </p>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4">{post.content}</p>

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
                <button
                  onClick={() => handleDelete(post.id)}
                  className="ml-auto text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      ) : (
        <p className="text-center text-gray-500">No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;