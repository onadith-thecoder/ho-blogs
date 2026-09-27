<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->latest()
            ->paginate(10);

        return response()->json($posts);
    }

    public function show(Post $post)
    {
        $related = Post::where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where(function ($builder) use ($post) {
                $builder->where('user_id', $post->user_id)
                        ->orWhere('title', 'like', '%' . explode(' ', $post->title)[0] . '%');
            })
            ->latest()
            ->take(3)
            ->get();

        return response()->json([
            'post' => $post,
            'related_posts' => $related,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'featured_image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        $validated['slug'] = Str::slug($validated['title']);
        $validated['user_id'] = $request->user()->id;

        $post = Post::create($validated);
        $post->featured_image_url = $post->featured_image ? asset('storage/' . $post->featured_image) : null;

        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'featured_image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        $validated['slug'] = Str::slug($validated['title']);

        $post->update($validated);
        $post->featured_image_url = $post->featured_image ? asset('storage/' . $post->featured_image) : null;

        return response()->json($post);
    }

    public function destroy(Request $request, Post $post)
    {
        if ($post->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

        public function latest()
    {
        $posts = Post::where('status', 'published')
            ->latest()
            ->take(3)
            ->get();

        return response()->json($posts);
    }

    public function search(Request $request)
    {
        $query = $request->validate([
            'q' => 'required|string|min:2',
        ])['q'];

        $posts = Post::where('status', 'published')
            ->where(function ($builder) use ($query) {
                $builder->where('title', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
            })
            ->latest()
            ->get();

        return response()->json($posts);
    }

}
