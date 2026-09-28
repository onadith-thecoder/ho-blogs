<?php

use App\Models\User;

it('allows a user to register', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure(['user', 'token']);

    $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
});

it('allows a user to login with correct credentials', function () {
    $user = User::factory()->create(['password' => bcrypt('password123')]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure(['user', 'token']);
});