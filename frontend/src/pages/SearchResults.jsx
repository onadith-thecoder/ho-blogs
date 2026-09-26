import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import apiClient from "../api/client";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);
    apiClient
      .get("/posts/search", { params: { q: query } })
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        setError("Something went wrong while searching.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search results for "{query}"
      </h1>
      {loading && <p className="text-gray-500">Searching...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts found matching your search.</p>
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}