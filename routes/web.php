<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);
Route::get('/{vue_capture}', function () {
    return view('app');
})->where('vue_capture', '[\/\w\.-]*');

// Catch All other Routes
Route::any('{any}', function () {
    abort(404);
})->where('any', '.*');
