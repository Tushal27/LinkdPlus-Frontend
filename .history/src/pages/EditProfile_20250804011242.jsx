import React, { useState, useEffect } from "react";
import api from "../api/axios";

const EditProfile = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        
        {/* Top Nav */}
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">✖</button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src={`http://127.0.0.1:8000${profile.avatar}`}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover mb-3"
            />
            <label className="cursor-pointer bg-gray-200 px-3 py-1 rounded-lg text-sm">
              Change Picture
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                className="w-full border p-2 rounded resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;