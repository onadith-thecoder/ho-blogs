<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\str;

class PostController extends Controller
{

    public function index() 
    {
      $posts = Post::where('status', 'published')->latest()->paginate(10);
      return view('posts.index', compact('posts'));
    }

    public function create()
    {
      return view('posts.create');
    }

    public function store(Request $request) 
    { 
       $validated = $request -> validate([
        'title' => 'required|string|max:255',
        'excerpt' => 'required|string|max:255',
        'content' => 'required|string|',
        'status' => 'required|in:draft,published',
        'featured_image' => 'nullable|image|max:20480',
       ]);

       if($request->hasFile('featured_image')){
        $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
       }

       $validated['slug'] = str::slug($validated['title']);
       $validated['user_id'] = auth()->id();

        Post::create($validated);

        return redirect()->route('posts.index')->with('success', 'Post created successfully!');

    }

    public function show(Post $post) 
    {
      return view('posts.show', compact('post'));
    }

    public function edit(Post $post)
    {
      if ($post->user_id != auth()->id()) {
        abort(403);
      }
      return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
      if ($post->user_id != auth()->id()) {
        abort(403);
      }

      $validated = $request -> validate([
        'title' => 'required|string|max:255',
        'excerpt' => 'required|string|max:255',
        'content' => 'required|string',
        'status' => 'required|in:draft,published',
        'featured_image' => 'nullable|image|max:20480',
      ]);

      if($request->hasFile('featured_image')){
        $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
       }

      $validated['slug'] = str::slug($validated['title']);
      $post->update($validated);

      return redirect()->route('posts.show', $post)->with('success', 'Post updated successfully!');
    }

    public function destroy(Post $post)
    {
      if ($post->user_id != auth()->id()) {
        abort(403);
      }

      $post->delete();

      return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');
    }

}
