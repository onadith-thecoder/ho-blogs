import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ title, excerpt, content });
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <textarea
            name="excerpt"
          placeholder="Excerpt (short summary)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="border border-gray-300 rounded p-2"
          rows={2}
        />
        <textarea
        name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded p-2"
          rows={8}
        />
        <button
          type="submit"
          className="bg-black text-white rounded p-2 hover:bg-gray-800"
        >
          Publish
        </button>
      </form>
    </main>
  );
}