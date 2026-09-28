<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        return response()->json(
            $post->comments()->with('user:id,name')->get()
        );
    }

    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $validated['body'],
        ]);

        return response()->json($comment->load('user:id,name'), 201);
    }

    public function destroy(Request $request, Comment $comment)
    {
        if ($comment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}