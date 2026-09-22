<x-app-layout>
    <div style="padding: 20px; max-width: 600px;">
        <h1>Edit Post</h1>

        @if ($errors->any())
            <div style="color: red;">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('posts.update', $post) }}">
            @csrf
            @method('PUT')

            <div style="margin-bottom: 15px;">
                <label>Title</label><br>
                <input type="text" name="title" value="{{ old('title', $post->title) }}" style="width: 100%;">
            </div>

            <div style="margin-bottom: 15px;">
                <label>Excerpt (short summary)</label><br>
                <textarea name="excerpt" rows="2" style="width: 100%;">{{ old('excerpt', $post->excerpt) }}</textarea>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Content</label><br>
                <textarea name="content" rows="10" style="width: 100%;">{{ old('content', $post->content) }}</textarea>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Status</label><br>
                <select name="status">
                    <option value="draft" {{ old('status', $post->status) === 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status', $post->status) === 'published' ? 'selected' : '' }}>Published</option>
                </select>
            </div>
            
            <button type="submit">Update Post</button>

        </form>
    </div>
</x-app-layout>