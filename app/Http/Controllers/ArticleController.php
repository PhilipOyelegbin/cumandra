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
        $tech = Http::get("$this->apiUrl/articles?category=tech&limit=3");
        $sport = Http::get("$this->apiUrl/articles?category=sports&limit=1");
        $finance = Http::get("$this->apiUrl/articles?category=finance&limit=3");

        dd([
            'apiUrl' => $this->apiUrl,

            'tech' => [
                'status' => $tech->status(),
                'successful' => $tech->successful(),
                'body' => $tech->body(),
                'json' => $tech->json(),
            ],

            'sports' => [
                'status' => $sport->status(),
                'successful' => $sport->successful(),
                'body' => $sport->body(),
                'json' => $sport->json(),
            ],

            'finance' => [
                'status' => $finance->status(),
                'successful' => $finance->successful(),
                'body' => $finance->body(),
                'json' => $finance->json(),
            ],
        ]);
    }

    // public function home()
    // {
    //     if (Redis::exists("$this->cacheKey-home")) {
    //         $result = json_decode(Redis::get("$this->cacheKey-home"), true);
    //     } else {
    //         $tech = Http::get("$this->apiUrl/articles?category=tech&limit=3");
    //         $sport = Http::get("$this->apiUrl/articles?category=sports&limit=1");
    //         $finance = Http::get("$this->apiUrl/articles?category=finance&limit=3");
    //         $result = array_merge([
    //             'tech' => $tech->json(),
    //             'sports' => $sport->json(),
    //             'finance' => $finance->json(),
    //         ]);
    //         Redis::set("$this->cacheKey-home", json_encode($result));
    //     }

    //     return view('welcome', compact('result'));
    // }

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
