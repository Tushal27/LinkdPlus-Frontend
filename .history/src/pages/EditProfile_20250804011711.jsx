import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditProfile = ({ onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        setProfile(res.data);
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          bio: res.data.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setAvatar(e.target.files[0]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("bio", form.bio);
      if (avatar) formData.append("avatar", avatar);

      await api.patch("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated!");
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full max-w-4xl flex flex-col rounded-none shadow-none">
        
        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button  className="text-white text-xl font-bold hover:text-gray-300">✖</button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8 p-8 flex-1 overflow-y-auto bg-white">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src={`http://127.0.0.1:8000${profile.avatar}`}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Change Photo
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                className="w-full border p-3 rounded resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 px-8 py-4 border-t bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;