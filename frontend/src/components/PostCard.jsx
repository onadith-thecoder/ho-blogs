export default function PostCard({ post }) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-500 mt-1">
        {post.user.name} · {new Date(post.created_at).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-700">{post.excerpt}</p>
    </article>
  );
}