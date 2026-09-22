<x-app-layout>
    <div style="padding: 20px; max-width: 700px;">
        <p><a href="{{ route('posts.index') }}">&larr; Back to all posts</a></p>

        <h1>{{ $post->title }}</h1>
        <small>By {{ $post->user->name }} — {{ $post->created_at->format('d M Y') }}</small>

        @if ($post->featured_image)
            <div style="margin: 15px 0;">
                <img src="{{ asset('storage/' . $post->featured_image) }}" alt="{{ $post->title }}" style="max-width: 100%;">
            </div>
        @endif

        <p style="margin-top: 15px;">{{ $post->content }}</p>

        @auth
            @if ($post->user_id === auth()->id())
                <hr>
                <p>
                    <a href="{{ route('posts.edit', $post) }}">Edit</a>
                    &nbsp;|&nbsp;
                    <form action="{{ route('posts.destroy', $post) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Delete this post?')">Delete</button>
                    </form>
                </p>
            @endif
        @endauth
    </div>
</x-app-layout>