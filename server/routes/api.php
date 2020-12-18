<?php

use Illuminate\Support\Facades\Route;

// Auth API's
Route::post('/login', 'Api\Auth\AuthController@Login');
Route::post('/register', 'Api\Auth\AuthController@Register');
Route::get('/me', 'Api\Auth\AuthController@Me');
Route::get('/logout', 'Api\Auth\AuthController@Logout');
Route::post('/reset', 'Api\Auth\AuthController@Reset');

// Admin API's
Route::group(['prefix' => 'admin', 'middleware' => ['admin']], function () {
    Route::get('/dashboard', 'Api\Admin\DashboardController@index');
    Route::apiResource('/category', 'Api\Admin\CategoryController');
    Route::get('/video', 'Api\Admin\VideoController@index');
    Route::post('/video', 'Api\Admin\VideoController@store');
    Route::get('/video/{id}', 'Api\Admin\VideoController@show');
    Route::apiResource('/audio', 'Api\Admin\AudioController');
});

// User API's
Route::group(['prefix' => 'user', 'middleware' => ['user']], function () {
    Route::get('/home', 'Api\User\HomeController@index');
    Route::get('/category', 'Api\User\CategoryController@index');
    Route::get('/category/{id}/videos', 'Api\User\CategoryController@videos');
    Route::get('/video/{id}/show', 'Api\User\HomeController@showVideo');
    Route::get('/audio', 'Api\User\HomeController@audioIndex');

    Route::get('/my/videos/{id}', 'Api\User\HomeController@myVideos');
    Route::get('/my/audios/{id}', 'Api\User\HomeController@myAudios');
    Route::get('/categories', 'Api\User\HomeController@categoryIndex');
    Route::post('/video/store', 'Api\User\HomeController@storeVideo');
    Route::post('/audio/store', 'Api\User\HomeController@storeAudio');
    Route::post('/video/favourite', 'Api\User\HomeController@makeFavourite');
    Route::get('/video/favourite/{id}', 'Api\User\HomeController@favouriteList');

    Route::get('/users/{id}', 'Api\User\HomeController@usersIndex');
});
