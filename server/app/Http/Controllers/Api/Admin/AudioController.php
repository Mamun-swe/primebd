<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Validator;

class AudioController extends Controller
{
    // root URL
    public function rootUrl()
    {
        return $url = URL::to('');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        $audio->user_id = $request->user_id ? $request->user_id : 1;
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Audio::where('id', $id)->first();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Audio not found',
            ], 404);
        }

        $audio = (object) [
            'id' => $data->id,
            'title' => $data->title,
            'audio' => $this->rootUrl() . '/audios/' . $data->audio,
        ];

        return response()->json([
            'status' => true,
            'audio' => $audio,
        ], 200);
    }
}
