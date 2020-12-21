<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Validator;

class VideoController extends Controller
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
        $results = Video::where('banned', 0)->select('id', 'title', 'banner')->get();
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

    // Store video
    public function store(Request $request)
    {
        $rules = [
            'category_id' => 'required',
            'title' => 'required',
            'banner' => 'required',
            'video' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ]);
        }

        $video = new Video();
        $video->user_id = $request->user_id;
        $video->category_id = $request->category_id;
        $video->title = $request->title;
        if ($request->file('banner')) {
            $file = $request->file('banner');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move(public_path() . '/banners/', $filename);
            $video->banner = $fileName;
        }

        if ($request->file('video')) {
            $file = $request->file('video');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move(public_path() . '/videos/', $filename);
            $video->video = $fileName;
        }

        $data = $video->save();

        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'Successfully video uploaded.',
            ], 200);
        }
        return response()->json([
            'status' => true,
            'message' => 'Failed! Server Error',
        ], 501);
    }

    // Show individual video
    public function show($id)
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
