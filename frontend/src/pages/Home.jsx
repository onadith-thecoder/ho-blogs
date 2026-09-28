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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="font-heading text-3xl font-bold mb-6 text-offwhite">Latest Posts</h1>
      {loading && <p className="text-muted">Loading posts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-muted">No posts yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}