<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ArticleController::class, 'home'])->name('home');
Route::get('/articles', [ArticleController::class, 'articles'])->name('articles');
Route::post('/articles', [ArticleController::class, 'filter'])->name('articles.filter');
Route::get('/debug', function () {
    return response()->json([
        'status' => 'Laravel is running',
        'environment' => app()->environment(),
        'debug' => config('app.debug'),
        'laravel' => app()->version(),
        'php' => PHP_VERSION,
    ]);
});
