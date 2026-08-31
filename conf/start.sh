#!/bin/sh
set -e

echo "Starting Laravel application..."

# Ensure Laravel can write to required directories
chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Cache Laravel configuration/routes/views for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in the background
php-fpm -D

# Start Nginx in the foreground
exec nginx -g "daemon off;"
