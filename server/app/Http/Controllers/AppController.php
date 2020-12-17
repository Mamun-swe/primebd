<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    public function index()
    {
        return response()->json('Opps ! Bad request.');
    }
}
