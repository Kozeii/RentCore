<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Building extends Model
{
    protected $fillable = [
        'name',
        'address',
        'city',
        'province',
        'zip_code',
        'description',
    ];
    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }
}