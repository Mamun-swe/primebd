<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth API's
Route::post('/login', 'Api\Auth\AuthController@Login');
Route::post('/register', 'Api\Auth\AuthController@Register');
Route::get('/me', 'Api\Auth\AuthController@Me');
Route::get('/logout', 'Api\Auth\AuthController@Logout');
Route::post('/reset', 'Api\Auth\AuthController@Reset');

// Admin API's
Route::group(['prefix' => 'admin'], function () {
    Route::get('/dashboard', 'Api\Admin\DashboardController@index');
    Route::apiResource('/category', 'Api\Admin\CategoryController');
    Route::get('/video', 'Api\Admin\VideoController@index');
    Route::post('/video', 'Api\Admin\VideoController@store');
    Route::get('/video/{id}', 'Api\Admin\VideoController@show');
    Route::apiResource('/audio', 'Api\Admin\AudioController');
});

// User API's
Route::group(['prefix' => 'user'], function () {
    Route::get('/home', 'Api\User\HomeController@index');
    Route::get('/category', 'Api\User\CategoryController@index');
    Route::get('/category/{id}/videos', 'Api\User\CategoryController@videos');
    Route::get('/video/{id}', 'Api\User\HomeController@showVideo');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
