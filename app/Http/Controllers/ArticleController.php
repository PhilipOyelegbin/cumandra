<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redis;

class ArticleController extends Controller
{
    public function __construct(
        private $apiUrl = 'https://noozra.com/api',
        private $cacheKey = 'articles',
    ) {}

    public function home()
    {
        if (Redis::exists($this->cacheKey)) {
            $articles = json_decode(Redis::get("$this->cacheKey-home"), true);
        } else {
            $techData = Http::get("$this->apiUrl/articles?category=tech&limit=3");
            $tech = $techData->json();
            $sportData = Http::get("$this->apiUrl/articles?category=sports&limit=1");
            $sport = $sportData->json();
            $financeData = Http::get("$this->apiUrl/articles?category=finance&limit=3");
            $finance = $financeData->json();
            $articles = array_merge([
                'tech' => $tech,
                'sports' => $sport,
                'finance' => $finance,
            ]);
            Redis::set("$this->cacheKey-home", json_encode($articles));
        }

        return view('welcome', compact('articles'));
    }

    public function cartegories(Request $request)
    {
        if (Redis::exists($this->cacheKey)) {
            $cartegories = json_decode(Redis::get("$this->cacheKey-cartegories"), true);
        } else {
            $response = Http::get("$this->apiUrl/category");
            $cartegories = $response->json();
            Redis::set("$this->cacheKey-cartegories", json_encode($cartegories));
        }

        return view('articles', compact('cartegories'));
    }

    public function articles(Request $request)
    {
        if (Redis::exists($this->cacheKey)) {
            $articles = json_decode(Redis::get("$this->cacheKey-articles"), true);
        } else {
            $response = Http::get("$this->apiUrl/articles?category={$request->query('category')}");
            $articles = $response->json();
            Redis::set("$this->cacheKey-articles", json_encode($articles));
        }

        return view('articles', compact('articles'));
    }
}
