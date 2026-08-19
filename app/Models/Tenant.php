<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Tenant extends Model
{
    protected $fillable = [
        'building_id',
        'unit_id',
        'full_name',
        'email',
        'phone',
        'status',
        'monthly_rent',
        'deposit',
        'lease_start',
        'lease_end',
      ];
      public function building() : BelongsTo
      {
        return $this->belongsTo(Building::class);
      }
      public function unit():BelongsTo
      {
        return $this->belongsTo(Unit::class);
      }

}
