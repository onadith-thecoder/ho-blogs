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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="font-heading text-2xl font-bold mb-6 text-offwhite">
        Search results for "{query}"
      </h1>
      {loading && <p className="text-muted">Searching...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-muted">No posts found matching your search.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}