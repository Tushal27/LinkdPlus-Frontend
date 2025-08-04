import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
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
    api.get("/profile/")
      .then((res) => {
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          bio: res.data.bio || "",
          email: res.data.email || "",
        });
        setCurrentAvatar(res.data.avatar);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAvatarChange = (e) => setAvatar(e.target.files[0]);

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await api.patch("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) navigate("/profile");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-400 p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 md:p-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src={
                currentAvatar
                  ?  `http://127.0.0.1:8000${currentAvatar}`
                  : "https://via.placeholder.com/150"
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 mb-3"
            />
            <label className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg text-white cursor-pointer hover:opacity-90">
              Change Photo
              <input type="file" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-4">
            {["email", "first_name", "last_name"].map((field, i) => (
              <div key={i}>
                <label className="block mb-1 font-medium capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => navigate("/profile")}
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}