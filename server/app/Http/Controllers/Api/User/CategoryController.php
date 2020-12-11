<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Video;
use Illuminate\Support\Facades\URL;

class CategoryController extends Controller
{
    // ROOT URL
    public function rootUrl()
    {
        return $url = URL::to('');
    }

    // All Categories
    public function index()
    {
        $categories = array();
        $results = Category::orderBy('id', 'DESC')->get();

        foreach ($results as $result) {
            $categories[] = array(
                "id" => $result->id,
                "name" => $result->name,
                "image" => $this->rootUrl() . '' . '/categories/' . $result->image,
            );
        }

        if (!$categories) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($categories, 200);
    }

    // Category videos
    public function videos($id)
    {
        $videos = array();
        $results = Video::where('category_id', $id)->get();
        if (!$results) {
            return response()->json([
                'status' => false,
                'message' => 'Video not found',
            ], 404);
        }

        foreach ($results as $result) {
            $videos[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "banner" => $this->rootUrl() . '' . '/banners/' . $result->banner,
            );
        }

        return response()->json([
            'status' => true,
            'videos' => $videos,
        ], 200);
    }
}
