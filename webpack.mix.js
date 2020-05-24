const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')
require('laravel-mix-purgecss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .ts('resources/js/app.ts', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')]
  })
  .webpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/js'),
        '@@': path.resolve(__dirname, 'node_modules'),
        '@assets': path.resolve(__dirname, 'resources/assets'),
        '@sass': path.resolve(__dirname, 'resources/sass')
      }
    }
  })
  .browserSync('kickstart.local')
  .purgeCss({
    enabled: mix.inProduction(),
    folders: ['src', 'templates'],
    extensions: ['html', 'js', 'php', 'vue', 'ts']
  })

if (mix.inProduction()) {
  mix.version().sourceMaps()
}
