#!/bin/sh

echo "🎬 artisan commands"

php artisan cache:clear
php artisan migrate --no-interaction --force

echo "🎬 start supervisord"
supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf
