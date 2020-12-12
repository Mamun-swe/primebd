<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Support\Facades\URL;

class HomeController extends Controller
{
    // root URL
    public function rootUrl()
    {
        return $url = URL::to('');
    }

    // Video index
    public function index()
    {
        $resultsArray = array();
        $results = Video::select('id', 'title', 'banner')->get();
        foreach ($results as $result) {
            $resultsArray[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "banner" => $this->rootUrl() . '' . '/banners/' . $result->banner,
            );
        }
        return response()->json([
            'status' => true,
            'videos' => $resultsArray,
        ], 200);
    }

    // Show individual video
    public function showVideo($id)
    {
        $data = Video::where('id', $id)->first();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Video not found',
            ], 404);
        }

        $video = (object) [
            'id' => $data->id,
            'title' => $data->title,
            'banner' => $this->rootUrl() . '' . '/banners/' . $data->banner,
            'video' => $this->rootUrl() . '/videos/' . $data->video,
        ];

        return response()->json([
            'status' => true,
            'video' => $video,
        ], 200);
    }
}
