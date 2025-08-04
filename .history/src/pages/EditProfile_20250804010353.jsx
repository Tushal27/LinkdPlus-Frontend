import React, { useState } from "react";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {["personal", "dashboard", "advanced"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 capitalize font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Photo */}
        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <button className="ml-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Change Photo
          </button>
        </div>

        {/* Form */}
        {activeTab === "personal" && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Your title"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Organization
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Organization Name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Work Phone
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Mobile Phone
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="example@mail.com"
              />
            </div>
          </form>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;