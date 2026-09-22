<?php

use App\Models\User;
use App\Models\Post;

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

it('search returns only matching published posts', function () {
    Post::factory()->create(['title' => 'Laravel tips', 'status' => 'published']);
    Post::factory()->create(['title' => 'Cooking recipes', 'status' => 'published']);

    $response = $this->getJson('/api/posts/search?q=Laravel');

    $response->assertStatus(200)->assertJsonCount(1);
});