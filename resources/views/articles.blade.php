<x-layout>
    @if($articles['tech']['error'])
        <div class="bg-softRed text-secondary dark:text-primary p-4 text-center">
            <p class="font-semibold">Error: {{ $articles['tech']['error'] }}</p>
        </div>        
    @else
        <section class="space-y-6 md:space-y-10 flex flex-col md:flex-row gap-3 px-6 md:px-10">
            <article class="space-y-3 md:max-w-4/6">
                <img src="{{ $articles['sports']['articles'][0]['image_url'] }}" alt="headline cover image" class="w-full h-auto object-center ease-linear duration-300">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h1 class="text-3xl font-bold">{{ $articles['sports']['articles'][0]['headline'] }}</h1>
                    <div class="space-y-3">
                        <p class="text-sm">{{ $articles['sports']['articles'][0]['description'] }}</p>
                        <a href="{{ $articles['sports']['articles'][0]['url'] }}" class="inline-block bg-rose-400 text-slate-800 hover:bg-rose-500 ease-linear duration-300 px-4 py-2" target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                </div>
            </article>

            <aside class="space-y-3 md:max-w-2/6 bg-[#0a0a0a] dark:bg-[#FDFDFC] dark:text-[#1b1b18] text-[#FDFDFC] p-2 shadow-md">
                <h2 class="text-yellow-600 text-xl font-bold">New</h2>
                @foreach($articles['finance']['articles'] as $article)
                    <a href="{{ $article['url'] }}" class="inline-block" target="_blank" rel="noopener noreferrer">
                        <h4 class="font-semibold">{{ $article['headline'] }}</h4>
                        <p class="text-xs">{{ $article['description'] }}</p>
                    </a>
                    <hr/>
                @endforeach
            </aside>
        </section>

        <section class="space-y-3 md:space-y-6 px-6 md:px-10 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach($articles['tech']['articles'] as $article)
                <a href="{{ $article['url'] }}" class="flex gap-2" target="_blank" rel="noopener noreferrer">
                    <img src="{{ $article['image_url'] }}" class="w-24 aspect-square object-center" alt="{{ $article['headline'] }}">
                    <div>
                        <h2 class="font-semibold line-clamp-3">{{ $article['headline'] }}</h2>
                        <p class="text-xs line-clamp-3">{{ $article['description'] }}</p>
                    </div>
                </a>
            @endforeach
        </section>
    @endif
</x-layout>