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
# Laravel + Nginx + PHP-FPM
#-------------------------

FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

COPY --from=frontend /app/public/build /var/www/html/public/build

ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

ENV COMPOSER_ALLOW_SUPERUSER=1

CMD ["/start.sh"]