<x-app-layout>
    <div style="padding: 20px;">
        <h1>Blog Posts</h1>

        @if (session('success'))
            <p style="color: green;">{{ session('success') }}</p>
        @endif

        @auth
            <p><a href="{{ route('posts.create') }}">+ Create New Post</a></p>
        @endauth

        @forelse ($posts as $post)
            <div style="border-bottom: 1px solid #ccc; padding: 10px 0;">
                <h2><a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a></h2>
                <p>{{ $post->excerpt }}</p>
                <small>By {{ $post->user->name }} - {{ $post->created_at->diffForHumans() }}</small>
            </div>
        @empty
            <p>No posts yet.</p>
        @endforelse

        {{ $posts->links() }}
    </div>
</x-app-layout>