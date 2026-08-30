FROM php:8.5-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    zip \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY package*.json composer.json composer.lock ./

RUN npm ci --no-audit --no-fund

RUN composer install \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --classmap-authoritative \
    --no-scripts

COPY . .

RUN npm run build

RUN composer dump-autoload \
    --optimize \
    --classmap-authoritative

EXPOSE 8000

CMD ["composer", "run", "dev"]
