<?php

test('authenticated user can comment on a post', function () {
    $user = \App\Models\User::factory()->create();
    $post = \App\Models\Post::factory()->create(['status' => 'published']);
    $token = $user->createToken('test')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer $token")
        ->postJson("/api/posts/{$post->id}/comments", ['body' => 'Nice post!']);

    $response->assertStatus(201);
    $this->assertDatabaseHas('comments', ['body' => 'Nice post!']);
});
