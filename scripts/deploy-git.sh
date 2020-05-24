#!/bin/sh
set -e

php artisan test

(git push) || true

git checkout master
git merge develop
git push origin master
git checkout develop