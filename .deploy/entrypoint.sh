#!/bin/sh

# php artisan migrate --no-interaction --force
# php artisan db:seed --no-interaction --force
echo "🎬 start supervisord"
supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf
