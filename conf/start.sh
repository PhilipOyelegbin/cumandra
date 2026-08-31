#!/bin/sh

set -e

echo "Starting Laravel..."

# Make sure Laravel directories are writable
chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Laravel production caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting PHP-FPM..."

# Start PHP-FPM in the background
php-fpm -D

# Verify PHP-FPM is running
sleep 1

echo "Starting Nginx..."

# Nginx must remain in foreground
exec nginx -g "daemon off;"
