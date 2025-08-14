import React from "react";

const formatTime = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now - createdDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;

  return createdDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function PostCard({ post, handleLike, handleDislike, setSelectedPost }) {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 mb-6 shadow-lg transition hover:scale-[1.01] hover:shadow-xl">
      
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <img
          src={`https://res.cloudinary.com/dhclzl4nf${post.author_avatar}`}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-white shadow-md mr-3 cursor-pointer hover:scale-105 transition"
        />
        <div>
          <p className="font-semibold text-white">{post.author}</p>
          <p className="text-xs text-gray-200">{formatTime(post.created)}</p>
        </div>
      </div>

      {/* Post Content */}
      <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
      <p className="text-gray-100 mb-4">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => handleLike(post.id)}
          className="flex items-center gap-1 text-green-300 hover:text-green-100 transition"
        >
          👍 {post.likes_count}
        </button>

        <button
          onClick={() => handleDislike(post.id)}
          className="flex items-center gap-1 text-red-300 hover:text-red-100 transition"
        >
          👎 {post.dislikes_count}
        </button>

        <button
          onClick={() => setSelectedPost(post.id)}
          className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-lg shadow hover:opacity-90 transition"
        >
          💬 Comments
        </button>
      </div>
    </div>
  );
}