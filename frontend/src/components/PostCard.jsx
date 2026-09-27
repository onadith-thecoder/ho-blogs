import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      {post.featured_image_url && (
        <img
          src={post.featured_image_url}
          alt={post.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}
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