<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $fillable = ['user_id', 'category_id', 'title', 'audio'];
}
