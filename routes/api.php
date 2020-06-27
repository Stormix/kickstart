<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user','API\UserController@getCurrentUser');
    Route::post('/user/2fa/prepare','API\UserController@prepareTwoFactor');
    Route::post('/user/2fa/confirm','API\UserController@confirmTwoFactor');
    Route::post('/user/2fa/refresh','API\UserController@refreshRecoveryCodes');
    Route::post('/user/2fa/disable','API\UserController@disableTwoFactorAuth');

    Route::put('/user/info', 'API\UserController@updateUserProfile');
    Route::put('/user/password', 'API\UserController@updateUserPassword');
});

// Broadcast::routes(['middleware' => ['auth:sanctum']]);
