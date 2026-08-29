<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        <title>{{ config('app.name', 'Laravel') }}</title>

        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-primary font-sans dark:bg-secondary text-secondary dark:text-primary antialiased">
        <nav class="flex items-center justify-between p-6 md:p-10 bg-primary dark:bg-secondary shadow-md">
            <h1 class="text-xl font-bold">Cumandra</h1>

            <ul class="flex space-x-4">
                <li><a href="/" class="text-darkGray dark:text-grayBlue hover:text-softOrange">Home</a></li>
                <li><a href="/articles" class="text-darkGray dark:text-grayBlue hover:text-softOrange">Articles</a></li>
            </ul>
        </nav>
        <main>
            {{ $slot }}
        </main>
    </body>
</html>