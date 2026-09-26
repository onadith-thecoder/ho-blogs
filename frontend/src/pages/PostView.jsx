import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get(`/posts/${id}`)
      .then((response) => {
        setPost(response.data.post);
        setRelatedPosts(response.data.related_posts);
      })
      .catch(() => {
        setError("Could not load this post.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="max-w-2xl mx-auto p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="max-w-2xl mx-auto p-6 text-red-600">{error}</p>;
  if (!post) return null;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-sm text-gray-500 hover:underline">
        ← Back to posts
      </Link>
      <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="mt-6 whitespace-pre-wrap text-gray-800">
        {post.content}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold mb-3">Related Posts</h2>
          <ul className="space-y-2">
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link
                  to={`/posts/${related.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}