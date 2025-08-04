import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", bio: "", avatar: null });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/");
      setProfile(res.data);
      setFormData({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        bio: res.data.bio || "",
        avatar: null,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      await api.patch("/profile/", data, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded-lg"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full border px-3 py-2 rounded-lg"
          ></textarea>
          <input type="file" name="avatar" onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;