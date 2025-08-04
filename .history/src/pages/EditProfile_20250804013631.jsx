import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    email: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          bio: res.data.bio || "",
          email: res.data.email || "",
        });
        setCurrentAvatar(res.data.avatar);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("bio", form.bio);
    formData.append("email", form.email);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await api.patch("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        navigate("/profile"); // ✅ Redirect only on success
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Navbar */}
      <div className="flex justify-between lg:mb-100 items-center bg-blue-600 px-4 py-3 rounded-lg mb-6">
        <h2 className="text-lg font-bold">Edit Profile</h2>
        <button
          onClick={() => navigate("/profile")}
          className="text-xl font-bold"
        >
          ✕
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={
              currentAvatar
                ? `http://127.0.0.1:8000${currentAvatar}`
                : "https://via.placeholder.com/150"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover mb-3"
          />
          <label className="bg-blue-500 px-3 py-1 rounded-lg cursor-pointer">
            Change Photo
            <input
              type="file"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="last_name" 
              value={form.last_name}
              onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none"
              rows="3"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-600 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default EditProfile;