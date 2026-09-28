import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="block group">
      <article
        className="rounded-2xl border border-teal/25 bg-bg-dark-2/50 backdrop-blur-sm overflow-hidden
                   shadow-lg shadow-black/20 transition-all duration-300
                   group-hover:-translate-y-1 group-hover:border-mustard/60
                   group-hover:shadow-[0_0_24px_2px_rgba(223,175,52,0.25)]"
      >
        {post.featured_image_url && (
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-2 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-5">
          <h2 className="font-heading text-xl font-semibold text-offwhite group-hover:text-mustard transition-colors">
            {post.title}
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 text-xs">
            <span className="rounded-full bg-mustard/15 text-mustard px-2.5 py-0.5 font-medium">
              {post.user?.name ?? "Unknown author"}
            </span>
            <span className="text-muted">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-3 text-sm text-offwhite/80 line-clamp-2">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}