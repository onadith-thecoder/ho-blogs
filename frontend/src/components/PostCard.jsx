import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
      </Link>
      <p className="text-sm text-gray-500 mt-1">
        {post.user?.name ?? "Unknown author"} ·{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-700">{post.excerpt}</p>
    </article>
  );
}