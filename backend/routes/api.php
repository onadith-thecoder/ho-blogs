<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController as ApiPostController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

Route::get('/posts', [ApiPostController::class, 'index']);
Route::get('/posts/{post}', [ApiPostController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/posts', [ApiPostController::class, 'store']);
    Route::put('/posts/{post}', [ApiPostController::class, 'update']);
    Route::delete('/posts/{post}', [ApiPostController::class, 'destroy']);
});
