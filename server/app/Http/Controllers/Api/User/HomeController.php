<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use App\Models\Category;
use App\Models\Favourite;
use App\Models\Video;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Validator;

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

    // Audio Index
    public function audioIndex()
    {
        $resultsArray = array();
        $results = Audio::select('id', 'title', 'audio')->get();
        foreach ($results as $result) {
            $resultsArray[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "audio" => $this->rootUrl() . '' . '/audios/' . $result->audio,
            );
        }
        return response()->json([
            'status' => true,
            'audios' => $resultsArray,
        ], 200);
    }

    // My Videos
    public function myVideos($id)
    {
        $resultsArr = array();
        $results = Video::where('user_id', '=', $id)->select('id', 'title', 'banner')->get();
        foreach ($results as $result) {
            $resultsArr[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "banner" => $this->rootUrl() . '' . '/banners/' . $result->banner,
            );
        }
        return response()->json([
            'status' => true,
            'videos' => $resultsArr,
        ], 200);
    }

    // My Audios
    public function myAudios($id)
    {
        $resultsArray = array();
        $results = Audio::where('user_id', '=', $id)->select('id', 'title', 'audio')->get();
        foreach ($results as $result) {
            $resultsArray[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "audio" => $this->rootUrl() . '' . '/audios/' . $result->audio,
            );
        }
        return response()->json([
            'status' => true,
            'audios' => $resultsArray,
        ], 200);
    }

    // Category Index
    public function categoryIndex()
    {
        $categories = array();
        $results = Category::orderBy('id', 'DESC')->get();

        foreach ($results as $result) {
            $categories[] = array(
                "id" => $result->id,
                "name" => $result->name,
            );
        }

        if (!$categories) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($categories, 200);
    }

    // Upload Video
    public function storeVideo(Request $request)
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
            $file->move('banners', $fileName);
            $video->banner = $fileName;
        }

        if ($request->file('video')) {
            $file = $request->file('video');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('videos', $fileName);
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

    // Upload Audio
    public function storeAudio(Request $request)
    {
        $rules = [
            'category_id' => 'required',
            'title' => 'required',
            'audio' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ]);
        }

        $audio = new Audio();
        $audio->user_id = $request->user_id;
        $audio->category_id = $request->category_id;
        $audio->title = $request->title;

        if ($request->file('audio')) {
            $file = $request->file('audio');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('audios', $fileName);
            $audio->audio = $fileName;
        }

        $data = $audio->save();

        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'Successfully audio uploaded.',
            ], 200);
        }
        return response()->json([
            'status' => true,
            'message' => 'Failed! Server Error',
        ], 501);
    }

    // Add to Favourite list
    public function makeFavourite(Request $request)
    {
        $exist = Favourite::where('user_id', '=', $request->uId)
            ->where('video_id', '=', $request->videoId)
            ->first();

        if (!$exist) {
            $favourite = new Favourite();
            $favourite->user_id = $request->uId;
            $favourite->video_id = $request->videoId;
            $result = $favourite->save();

            if ($result) {
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully added.',
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Failed! Server Error',
            ], 501);
        }

        return response()->json([
            'status' => false,
            'message' => 'This video already added',
        ], 208);
    }

    // Favourite List
    public function favouriteList($id)
    {
        $resultsArr = array();
        $results = Favourite::where('favourites.user_id', '=', $id)
            ->join('videos', 'videos.id', '=', 'favourites.video_id')
            ->select('videos.id', 'videos.title', 'videos.banner')
            ->get();

        foreach ($results as $result) {
            $resultsArr[] = array(
                "id" => $result->id,
                "title" => $result->title,
                "banner" => $this->rootUrl() . '' . '/banners/' . $result->banner,
            );
        }
        return response()->json([
            'status' => true,
            'videos' => $resultsArr,
        ], 200);
    }

    // All Users
    public function usersIndex($id)
    {
        $users = User::where('role', '!=', 'admin')
            ->where('id', '!=', $id)
            ->select('id', 'name')
            ->get();

        return response()->json([
            'status' => true,
            'users' => $users,
        ], 200);
    }
}
