<?php

use App\Models\User;
use App\Models\Post;

it('allows a guest to view the posts list', function () {
    $response = $this->get('/posts');

    $response->assertStatus(200);
});

it('prevents a guest from creating a post', function () {
    $response = $this->get('/posts/create');

    $response->assertRedirect('/login');
});

it('allows a logged-in user to create a post', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/posts', [
        'title' => 'Test Post',
        'excerpt' => 'A short excerpt',
        'content' => 'Full content here',
        'status' => 'published',
    ]);

    $response->assertRedirect('/posts');

    $this->assertDatabaseHas('posts', [
        'title' => 'Test Post',
        'slug' => 'test-post',
        'user_id' => $user->id,
    ]);
});

it('prevents a user from deleting someone else\'s post', function () {
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();

    $post = Post::factory()->create(['user_id' => $owner->id]);

    $response = $this->actingAs($otherUser)->delete("/posts/{$post->id}");

    $response->assertStatus(403);

    $this->assertDatabaseHas('posts', ['id' => $post->id]);
});

it('allows a user to update their own post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->put("/posts/{$post->id}", [
        'title' => 'Updated Title',
        'excerpt' => $post->excerpt,
        'content' => $post->content,
        'status' => 'published',
    ]);

    $response->assertRedirect("/posts/{$post->id}");

    $this->assertDatabaseHas('posts', [
        'id' => $post->id,
        'title' => 'Updated Title',
        'slug' => 'updated-title',
    ]);
});

it('rejects login via API with invalid credentials', function () {
    $user = User::factory()->create();

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $response->assertStatus(401);
});

it('allows a logged-in user to create a post via the API', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer {$token}")
        ->postJson('/api/posts', [
            'title' => 'API Created Post',
            'excerpt' => 'Created through the API',
            'content' => 'Full content here',
            'status' => 'published',
        ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('posts', [
        'title' => 'API Created Post',
        'user_id' => $user->id,
    ]);
});