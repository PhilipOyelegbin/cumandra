<x-layout>
    {{ dd($result) }}
    @if(data_get($result, 'tech.error') || data_get($result, 'sports.error') || data_get($result, 'finance.error'))
        <div class="bg-softRed text-secondary dark:text-primary p-4 text-center">
            <p class="font-semibold">
                Error: {{ data_get($result, 'tech.error') ?? data_get($result, 'sports.error') ?? data_get($result, 'finance.error') }}
            </p>
        </div>        
    @else
        <section class="space-y-6 md:space-y-10 flex flex-col md:flex-row gap-3 px-6 md:px-10">
            <article class="space-y-3 md:max-w-4/6">
                <img src="{{ $result['sports']['articles'][0]['image_url'] }}" alt="headline cover image" class="w-full h-auto object-center ease-linear duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h2 class="text-3xl font-bold">{{ $result['sports']['articles'][0]['headline'] }}</h2>
                    <div class="space-y-3">
                        <p class="text-sm text-darkGray dark:text-grayBlue">{{ $result['sports']['articles'][0]['description'] }}</p>
                        <a href="{{ $result['sports']['articles'][0]['url'] }}" class="inline-block bg-softRed text-secondary hover:bg-secondary hover:text-primary ease-linear duration-300 px-4 py-2" target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                </div>
            </article>

            <aside class="space-y-3 md:max-w-2/6 bg-secondary dark:bg-primary dark:text-secondary text-primary p-2 shadow-md">
                <h3 class="text-softOrange text-2xl font-bold">New</h3>
                @foreach($result['finance']['articles'] as $article)
                    <a href="{{ $article['url'] }}" class="inline-block" target="_blank" rel="noopener noreferrer">
                        <h4 class="font-semibold hover:text-softOrange ease-linear duration-300">{{ $article['headline'] }}</h4>
                        <p class="text-xs text-grayBlue dark:text-darkGray line-clamp-5">{{ $article['description'] }}</p>
                    </a>
                    <hr/>
                @endforeach
            </aside>
        </section>

        <section class="pb-10 space-y-3 md:space-y-6 px-6 md:px-10 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach($result['tech']['articles'] as $article)
                <a href="{{ $article['url'] }}" class="flex gap-2" target="_blank" rel="noopener noreferrer">
                    <img src="{{ $article['image_url'] }}" class="w-24 aspect-square object-center" alt="{{ $article['headline'] }}">
                    <div>
                        <h2 class="font-semibold hover:text-softRed ease-linear duration-300 line-clamp-3">{{ $article['headline'] }}</h2>
                        <p class="text-xs text-darkGray dark:text-grayBlue line-clamp-3">{{ $article['description'] }}</p>
                    </div>
                </a>
            @endforeach
        </section>
    @endif
</x-layout>