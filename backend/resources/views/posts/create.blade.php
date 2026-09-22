<x-app-layout>
    <div style="padding: 20px; max-width: 600px;">
        <h1>Create New Post</h1>

        @if ($errors->any())
            <div style="color: red;">
                <u1>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </u1>
            </div>
        @endif

        <form method="POST" action="{{ route('posts.store') }}" enctype="multipart/form-data">
            @csrf
            
            <div style="margin-bottom: 15px;">
                <label>Title</label><br>
                <input type="text" name="title" value="{{ old('title') }}" style="width: 100%;"
            </div>

            <div style="margin-bottom: 15px;">
                <label>Excerpt (short summary)</label><br>
                <textarea name="excerpt" rows="2" style="width: 100%;">{{ old('excerpt') }}</textarea>
            </div>

            <div style="margin-bottom: 15px;">
                <label>Content</laabel><br>
                <textarea name="content" rows="10" style="width: 100%;">{{ old('content') }}</textarea>
            </div>

            <div style="margin-bottom: 15px;">
                <label>Status</label><br>
                <select name="status">
                    <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status') === 'published' ? 'selected' : '' }}>Published</option>
                </select>
            </div>


            <div style="margin-bottom: 15px;">
                <label>Featured Image</label><br>
                <input type="file" name="featured_image" accept="image/*">
            </div>


            <button type="submit">Create Post</button>
        </form>
    </div>
</x-app-layout>