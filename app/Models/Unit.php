<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Unit extends Model
{

    protected $fillable = [
        'building_id',
        'unit_number',
        'rent_amount',
        'status',
        'description',

    ];

    public function building() : BelongsTo 
    {
        return $this->belongsTo(Building::class);
    }
}
