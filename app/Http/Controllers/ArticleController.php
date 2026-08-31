<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redis;

class ArticleController extends Controller
{
    public function __construct(
        private $apiUrl = 'https://noozra.com/api',
        private $cacheKey = 'cumandra',
    ) {}

    public function home()
    {
        if (Redis::exists("$this->cacheKey-home")) {
            $result = json_decode(Redis::get("$this->cacheKey-home"), true);
        } else {
            $tech = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 ...',
                    'Accept' => 'application/json',
                ])
                ->get("$this->apiUrl/articles?category=tech&limit=3")->throw();
            $sport = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 ...',
                    'Accept' => 'application/json',
                ])
                ->get("$this->apiUrl/articles?category=sports&limit=1")->throw();
            $finance = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 ...',
                    'Accept' => 'application/json',
                ])
                ->get("$this->apiUrl/articles?category=finance&limit=3")->throw();
            $result = array_merge([
                'tech' => $tech->json(),
                'sports' => $sport->json(),
                'finance' => $finance->json(),
            ]);
            Redis::set("$this->cacheKey-home", json_encode($result));
        }

        return view('welcome', compact('result'));
    }

    public function articles()
    {
        if (Redis::exists("$this->cacheKey-articles")) {
            $result = json_decode(Redis::get("$this->cacheKey-articles"), true);
        } else {
            $categories = Http::get("$this->apiUrl/categories");
            $articles = Http::get("$this->apiUrl/articles");
            $result = array_merge([
                'categories' => $categories->json(),
                'articles' => $articles->json(),
            ]);
            Redis::set("$this->cacheKey-articles", json_encode($result));
        }

        return view('articles', compact('result'));
    }

    public function filter(Request $request)
    {
        $validatedData = $request->validate(['category' => 'string|nullable']);

        $articles = Http::get("$this->apiUrl/articles", [
            'category' => $validatedData['category'],
        ]);
        $result = [
            'categories' => Http::get("$this->apiUrl/categories")->json(),
            'articles' => $articles->json(),
        ];

        return view('articles', compact('result'));
    }
}
