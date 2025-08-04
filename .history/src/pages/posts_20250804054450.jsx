import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { ClipLoader } from "react-spinners";

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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newPost, setNewPost] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await api.get(`/posts/${postId}/comments/`);
      setComments((prev) => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim() || !newTitle.trim()) return;

    try {
      const res = await api.post("/posts/", {
        title: newTitle,
        content: newPost,
      });
      setPosts((prev) => [res.data, ...prev]);
      setNewPost("");
      setNewTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/like/`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes_count: res.data.likes_count,
                dislikes_count: res.data.dislikes_count,
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {
    try {
      const res = await api.post(`/posts/${id}/dislike/`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes_count: res.data.likes_count,
                dislikes_count: res.data.dislikes_count,
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]?.trim()) return;

    try {
      const res = await api.post(`/posts/${postId}/comments/`, {
        content: newComment[postId],
      });
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data],
      }));
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Profile Section */}
        <div className="hidden md:block w-1/3">
          {profile && (
            <div className="bg-white p-5 rounded-xl shadow-md text-center">
              <img
                src={`http://127.0.0.1:8000${profile.avatar}`}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h2 className="text-xl font-semibold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-gray-500 mb-4">{profile.bio || "No bio yet"}</p>
              <p>
                <b>{profile.posts.length}</b> Posts
              </p>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          {/* Create Post */}
          <div className="bg-white p-5 rounded-xl shadow-md mb-6">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full border rounded-lg p-3 mb-3"
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border rounded-lg p-3 resize-none mb-3"
              rows="3"
            />
            <button
              onClick={handleCreatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Post
            </button>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader size={50} color="#3b82f6" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-xl shadow-md mb-6 md:flex md:gap-6"
              >
                {/* Left Side - Post */}
                <div className="md:w-2/3 border-b md:border-b-0 md:border-r pr-4">
                  <div className="flex items-center mb-3">
                    <img
                      src={`http://127.0.0.1:8000${post.author_avatar}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-gray-500 text-sm">
                        {formatTime(post.created)}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-800 mb-4">{post.content}</p>

                  <div className="flex gap-5">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="text-green-600 font-semibold"
                    >
                      👍 {post.likes_count}
                    </button>
                    <button
                      onClick={() => handleDislike(post.id)}
                      className="text-red-600 font-semibold"
                    >
                      👎 {post.dislikes_count}
                    </button>
                  </div>
                </div>

                {/* Right Side - Comments */}
                <div className="md:w-1/3 mt-4 md:mt-0 md:pl-4">
                  <h3 className="font-semibold mb-2">Comments</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {(comments[post.id] || []).map((c) => (
                      <div
                        key={c.id}
                        className="p-2 bg-gray-100 rounded-lg text-sm"
                      >
                        <p className="font-bold">{c.author}</p>
                        <p>{c.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="flex-1 p-2 border rounded-lg text-sm"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;