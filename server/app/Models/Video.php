<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = ['user_id', 'category_id', 'title', 'banner', 'video', 'banned'];
}
