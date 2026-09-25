import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import apiClient from "../api/client";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/posts")
      .then((response) => {
        setPosts(response.data.data.slice(0, 3));
      })
      .catch(() => {
        setError("Could not load posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {loading && <p className="text-gray-500">Loading posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}