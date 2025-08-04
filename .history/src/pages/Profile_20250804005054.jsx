import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

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


  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:gap-8 items-center md:items-start gap-6">
          <img
            src={`http://127.0.0.1:8000${profile.avatar}`}
            alt="Avatar"
            className="w-28 h-34  rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="mt-2 text-gray-700">{profile.bio || "No bio yet"}</p>

            <div className="flex gap-6 mt-3 text-gray-700">
              <p><b>{profile.posts.length}</b> Posts</p>
              <p><b>{profile.followers || 0}</b> Followers</p>
              <p><b>{profile.following || 0}</b> Following</p>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ✏ Edit Profile
            </button>
          </div>
        </div>

        <hr className="my-5" />

        <h3 className="text-xl font-semibold mb-3">Your Posts</h3>
        {profile.posts.length > 0 ? (
          profile.posts.map((post) => (
            <div key={post.id} className="bg-gray-50 p-4 rounded-lg mb-3 shadow-sm">
              <h4 className="font-bold">{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;