import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get(`/posts/${id}`)
      .then((response) => {
        const post = response.data.post;
        setTitle(post.title);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setStatus(post.status);
      })
      .catch(() => {
        setError("Could not load this post.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await apiClient.put(
        `/posts/${id}`,
        { title, excerpt, content, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/posts/${id}`);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You don't have permission to edit this post.");
      } else if (err.response?.status === 422) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="max-w-2xl mx-auto p-6 text-gray-500">Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border border-gray-300 rounded p-2"
          rows={2}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded p-2"
          rows={8}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="published">Publish</option>
          <option value="draft">Save as draft</option>
        </select>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white rounded p-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}