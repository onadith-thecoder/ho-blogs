import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function PostView() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

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

  useEffect(() => {
    apiClient
      .get(`/posts/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch(() => {});
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This cannot be undone."
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await apiClient.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch {
      setError("Could not delete this post.");
      setDeleting(false);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await apiClient.post(
        `/posts/${id}/comments`,
        { body: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([response.data, ...comments]);
      setNewComment("");
    } catch {
      setError("Could not post your comment.");
    } finally {
      setSubmittingComment(false);
    }
  }

  if (loading) return <p className="max-w-2xl mx-auto p-6 text-muted">Loading...</p>;
  if (error) return <p className="max-w-2xl mx-auto p-6 text-danger">{error}</p>;
  if (!post) return null;

  const isOwner = user && user.id === post.user_id;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link to="/" className="text-sm text-muted hover:text-mustard transition-colors">
        ← Back to posts
      </Link>

      {post.featured_image_url && (
        <img
          src={post.featured_image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-2xl mt-4 border border-teal/25"
        />
      )}

      <div className="flex items-start justify-between mt-4">
        <h1 className="font-heading text-3xl font-bold text-offwhite">{post.title}</h1>
        {isOwner && (
          <div className="flex gap-3 shrink-0 ml-4 text-sm">
            <Link
              to={`/posts/${post.id}/edit`}
              className="text-teal-soft hover:text-mustard underline transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-danger hover:brightness-110 underline disabled:opacity-50 transition"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-muted mt-1">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div className="mt-6 whitespace-pre-wrap text-offwhite/90 leading-relaxed">
        {post.content}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-10 border-t border-teal/25 pt-6">
          <h2 className="font-heading text-lg font-semibold mb-3 text-offwhite">Related Posts</h2>
          <ul className="space-y-2">
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link
                  to={`/posts/${related.id}`}
                  className="text-teal-soft hover:text-mustard transition-colors"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 border-t border-teal/25 pt-6">
        <h2 className="font-heading text-lg font-semibold mb-3 text-offwhite">Comments</h2>
        {user ? (
          <form onSubmit={handleAddComment} className="flex flex-col gap-2 mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="rounded-xl bg-bg-dark-2/60 border border-teal/30 p-3 text-offwhite placeholder-muted
                         focus:outline-none focus:border-mustard focus:ring-2 focus:ring-mustard/30 transition"
              rows={3}
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="self-start rounded-full bg-mustard text-bg-dark px-4 py-1.5 text-sm font-semibold
                         hover:shadow-[0_0_16px_2px_rgba(223,175,52,0.4)] transition disabled:opacity-50"
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-muted mb-6">
            <Link to="/login" className="underline text-teal-soft hover:text-mustard">
              Log in
            </Link>{" "}
            to leave a comment.
          </p>
        )}

        {comments.length === 0 ? (
          <p className="text-sm text-muted">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b border-teal/15 pb-3">
                <p className="text-sm font-medium text-mustard">
                  {comment.user?.name ?? "Unknown"}
                </p>
                <p className="text-offwhite/85 text-sm mt-1">{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}