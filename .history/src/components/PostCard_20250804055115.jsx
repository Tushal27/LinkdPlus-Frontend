import React, { useState } from "react";
import CommentsDrawer from "./CommentsDrawer";
import api from "../api/axios";

export default function PostCard({ post, profileAvatar, canDelete, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes_count);
  const [dislikes, setDislikes] = useState(post.dislikes_count);

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post.id}/like/`);
      setLikes(res.data.likes_count);
      setDislikes(res.data.dislikes_count);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.post(`/posts/${post.id}/dislike/`);
      setLikes(res.data.likes_count);
      setDislikes(res.data.dislikes_count);
    } catch (err) {
      console.error("Dislike failed", err);
    }
  };

  const formatTime = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now - createdDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;

    return createdDate.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-md mb-5">
        {/* Author */}
        <div className="flex items-center mb-3">
          <img
            src={`http://127.0.0.1:8000${post.author_avatar || profileAvatar}`}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
          />
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-gray-500 text-sm">{formatTime(post.created)}</p>
          </div>
        </div>

        {/* Post Content */}
        <h2 className="text-lg font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-green-600 hover:text-green-800"
          >
            👍 {likes}
          </button>
          <button
            onClick={handleDislike}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            👎 {dislikes}
          </button>
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            💬 Comments
          </button>

          {canDelete && (
            <button
              onClick={onDelete}
              className="ml-auto text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Comments Drawer */}
      <CommentsDrawer
        postId={post.id}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
}