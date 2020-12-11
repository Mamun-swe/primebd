<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use App\Models\Category;
use App\Models\Video;
use App\User;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::count();
        $audio = Audio::count();
        $video = Video::count();
        $category = Category::count();

        return response()->json([
            'status' => true,
            'users' => $users ? $users : null,
            'audio' => $audio ? $audio : null,
            'video' => $video ? $video : null,
            'category' => $category ? $category : null,
        ], 200);
    }
}
