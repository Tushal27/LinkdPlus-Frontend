import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommentsDrawer({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/posts/${postId}/comments/`, {
        content: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white shadow-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Comments</h2>
        <button onClick={onClose} className="text-xl font-bold">
          ✕
        </button>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {comments.length === 0 ? (
          <p className="text-center opacity-80">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-white text-black rounded-lg p-3 flex gap-3 items-start"
            >
              <img
                src={
                  c.author_avatar
                    ? `https://res.cloudinary.com/dhclzl4nf/${c.author_avatar}`
                    : "https://res.cloudinary.com/dhclzl4nf/image/upload/v1755195340/profileplaceholder-removebg-preview_kbbfpt"

                }
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="text-sm font-semibold">{c.author}</p>
                <p className="text-gray-700">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 rounded-lg text-black"
        />
        <button
          onClick={handleAddComment}
          className="bg-white text-purple-600 px-3 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}