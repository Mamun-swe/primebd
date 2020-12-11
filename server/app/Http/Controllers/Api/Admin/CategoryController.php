<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Validator;

class CategoryController extends Controller
{
    // ROOT URL
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
        $categories = array();
        $results = Category::orderBy('id', 'DESC')->get();

        foreach ($results as $result) {
            $categories[] = array(
                "id" => $result->id,
                "name" => $result->name,
                "image" => $this->rootUrl() . '' . '/categories/' . $result->image,
                "created_at" => $result->created_at,
                "updated_at" => $result->updated_at,
            );
        }

        if (!$categories) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $check = Category::where('name', $request->name)->first();

        if ($check) {
            return response()->json([
                'status' => false,
                'message' => 'This category already created.',
            ], 200);
        }

        $rules = [
            'name' => ['required', 'unique:categories'],
            'image' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ]);
        }
        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '.' . $extension;
        $file->move('categories', $filename);

        $form_data = array(
            'name' => $request->name,
            'image' => $filename,
        );

        $store = Category::create($form_data);
        if ($store) {
            return response()->json([
                'status' => true,
                'message' => 'Successfully Category created',
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Category create failed, internal server error',
        ], 501);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = Category::where('id', $id)->first();
        if (!$result) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category = (object) [
            "id" => $result->id,
            "name" => $result->name,
            "image" => $this->rootUrl() . '' . '/categories/' . $result->image,
            "created_at" => $result->created_at,
            "updated_at" => $result->updated_at,
        ];

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rules = [
            'name' => ['required'],
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::find($id);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;

            $old_image = public_path() . '/categories/' . $category->image;
            unlink($old_image);
            $file->move('categories', $filename);

            $form_data = array(
                'name' => $request->name,
                'image' => $filename,
            );

            $record = Category::find($id);
            $record->update($form_data);
            return response()->json([
                'status' => true,
                'message' => 'Successfully category updated',
            ], 200);

        } else {
            $form_data = array(
                'name' => $request->name,
            );

            $record = Category::find($id);
            $record->update($form_data);
            return response()->json([
                'status' => true,
                'message' => 'Successfully category updated',
            ], 200);
        }
    }
}
