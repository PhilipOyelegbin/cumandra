<x-layout>
    @if(data_get($result, 'categories.error') || data_get($result, 'articles.error'))
        <div class="bg-softRed text-secondary dark:text-primary p-4 text-center">
            <p class="font-semibold">
                Error: {{ data_get($result, 'categories.error') ?? data_get($result, 'articles.error') }}
            </p>
        </div>        
    @else
        <form action="{{ route('articles.filter') }}" method="POST" class="px-6 md:px-10 text-secondary dark:text-primary">
            @csrf
            <select id="filter" name="category" class="bg-primary dark:bg-secondary text-xs">
                <option value="">[ALL ARTICLES]</option>
                @foreach($result['categories']['categories'] as $category)
                    <option value="{{ $category }}">{{ ucwords($category) }}</option>
                @endforeach
            </select>
            <button type="submit" class="bg-softRed text-secondary hover:bg-secondary hover:text-primary ease-linear duration-300 text-xs cursor-pointer px-3 py-1">Filter</button>
        </form>

        <section class="pb-10 px-6 md:px-10 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach($result['articles']['articles'] as $article)
                <a href="{{ $article['url'] }}" class="hover:shadow hover:shadow-darkGray ease-linear duration-300" target="_blank" rel="noopener noreferrer">
                    <img src="{{ $article['image_url'] }}" class="w-full aspect-video object-center" alt="{{ $article['headline'] }}">
                    <div class="p-2">
                        <div class="flex justify-between items-center mt-1">
                            <p class="text-xs text-softOrange">{{ $article['category'] }}</p>
                            <p class="text-xs text-softRed">{{ $article['source'] }}</p>
                        </div>
                        <h2 class="font-semibold line-clamp-3">{{ $article['headline'] }}</h2>
                        <p class="text-darkGray dark:text-grayBlue text-sm line-clamp-3">{{ $article['description'] }}</p>
                    </div>
                </a>
            @endforeach
        </section>
    @endif
</x-layout>