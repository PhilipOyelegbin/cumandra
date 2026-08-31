#-------------------------
# Frontend build
#-------------------------
FROM node:22-bookworm AS frontend

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts --no-audit --no-fund

COPY . .

RUN npm run build

#-------------------------
# Install Composer dependencies
#-------------------------
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --classmap-authoritative \
    --no-scripts

#-------------------------
# PHP 8.5 + Nginx
#-------------------------
FROM php:8.5-fpm-bookworm

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        nginx \
        git \
        unzip \
        zip \
        libpq-dev \
        libzip-dev \
        libicu-dev \
        libonig-dev \
        libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    pdo_pgsql \
    mbstring \
    bcmath \
    intl \
    zip \
    xml

RUN php -m | grep -i opcache

RUN docker-php-ext-enable opcache

COPY conf/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

#==========================================
# Laravel application
#==========================================
COPY . .

COPY --from=composer /app/vendor /var/www/html/vendor

COPY --from=frontend /app/public/build /var/www/html/public/build

#==========================================
# Nginx configuration
#==========================================
RUN rm -f /etc/nginx/sites-enabled/default

COPY conf/nginx/nginx-site.conf /etc/nginx/conf.d/default.conf

#==========================================
# Permissions
#==========================================
RUN mkdir -p storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    bootstrap/cache \
    && chown -R www-data:www-data \
    storage \
    bootstrap/cache \
    public

#==========================================
# Laravel configuration
# ==========================================
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# ENV PORT=10000

#==========================================
# Startup script
#==========================================
COPY conf/start.sh /start.sh

RUN chmod +x /start.sh

#==========================================
# Verification
#==========================================
RUN php -v
RUN php artisan --version
RUN php artisan package:discover --ansi

# EXPOSE 10000

CMD ["/start.sh"]