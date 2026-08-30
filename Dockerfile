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
# Production image
#-------------------------

FROM richarvey/nginx-php-fpm:3.1.6

WORKDIR /var/www/html

COPY . .
COPY --from=composer /app/vendor /var/www/html/vendor
COPY --from=frontend /app/public/build /var/www/html/public/build

ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

ENV APP_ENV=production
ENV APP_DEBUG=true
ENV LOG_CHANNEL=stderr

ENV COMPOSER_ALLOW_SUPERUSER=1

# Diagnostic checks
RUN php -v
RUN php -m
RUN ls -la /var/www/html/vendor
RUN php artisan --version
RUN php artisan package:discover --ansi

CMD ["/start.sh"]