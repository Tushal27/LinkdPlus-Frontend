import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function CommentsDrawer({ postId, isOpen, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen && postId) fetchComments();
  }, [isOpen, postId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/posts/${postId}/comments/`, { content: newComment });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Comments</h2>
        <button onClick={onClose} className="text-xl">✕</button>
      </div>

      {/* Comments List */}
      <div className="p-4 overflow-y-auto flex-1 max-h-[75%]">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="mb-3 border-b pb-2">
              <p className="font-semibold">{c.author}</p>
              <p className="text-gray-700">{c.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg p-2 outline-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}