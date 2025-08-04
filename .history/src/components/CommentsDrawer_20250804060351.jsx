import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommentDrawer({ postId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/posts/${postId}/comments/`, {
        content: newComment,
      });
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">
      <div className="w-full sm:w-[400px] h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-xl p-5 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/40 pb-3 mb-4">
          <h2 className="text-lg font-bold text-white">Comments</h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {loading ? (
            <p className="text-white/90">Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-white/20 p-3 rounded-lg backdrop-blur-md shadow-md"
              >
                <p className="text-sm font-semibold text-white">
                  {c.author?.first_name} {c.author?.last_name}
                </p>
                <p className="text-white/90">{c.content}</p>
              </div>
            ))
          ) : (
            <p className="text-white/90">No comments yet.</p>
          )}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 rounded-lg outline-none bg-white/80 text-black placeholder-gray-600"
          />
          <button
            onClick={handlePostComment}
            className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}