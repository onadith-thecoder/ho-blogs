<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . fake()->unique()->numberBetween(1, 100000),
            'excerpt' => fake()->sentence(10),
            'content' => fake()->paragraphs(3, true),
            'featured_image' => null,
            'status' => 'published',
        ];
    }
}
