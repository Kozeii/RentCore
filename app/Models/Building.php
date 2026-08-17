<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'zip_code',
        'description',
    ];
}