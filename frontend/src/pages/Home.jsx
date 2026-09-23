
import PostCard from "../components/PostCard";
import mockPosts from "../data/mockPosts";

export default function Home() {
  const latestPublished = mockPosts
    .filter((post) => post.status === "published")
    .slice(0, 3);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      <div className="space-y-4">
        {latestPublished.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}