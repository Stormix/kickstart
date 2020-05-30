# (WIP) Kickstart - A Laravel Boilerplate for personal/client projects

![CI / CD](https://github.com/Stormix/kickstart/workflows/CI%20/%20CD/badge.svg)

## Introduction

A very opinionated Laravel SPA boiletplate using **Laravel 7.x + Sanctum** / **Typescript** / **Vue (VueRouter - Vuex)** / **TailwindCSS** / **Pest & Cypress**

## Features / ToDo:

Check the [.todo](./.todo) file for the current feature set.

## Prerequisites

- PHP 7.3
- Composer
- Node
- A laravel developer: You must be familiar with laravel. This distribution is intended for developers only.

## Installation

- Clone the repository
- Installer back dependencies with `composer install`
- Install front dependencies with `yarn`
- Copy file `.env.example` in `.env` and add following informations:
  - Database credentials (`DB_HOST`, `DB_PORT`, ...)
  - Application url (`APP_URL`). Either virtual host address if you configure one, either address form the command `php artisan serve`
- Generate application key with `php artisan key:generate`
- Launch migrations with `php artisan migrate`.
- Build front with `yarn dev`

If you didn't set a virtual host, launch application with the `php artisan serve` command. By default, application will be served at `http://127.0.0.1:8000`

## Configuring

## Testing

### Pest

### Cypress

## Docker

## CI / CD

### Github Actions

## Issues

If you come across any issues please [report them here](https://github.com/Stormix/kickstart/issues).

## Contributing

Thank you for considering contributing to this project! Please feel free to make any pull requests, or e-mail me a feature request you would like to see in the future to anas.mazouni@stormix.co

## Security Vulnerabilities

If you discover a security vulnerability within this boilerplate, please send an e-mail to [anas.mazouni@stormix.co](mailto:anas.mazouni@stormix.co), or create a pull request if possible. All security vulnerabilities will be promptly addressed.
