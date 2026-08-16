<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_id',
        'full_name',
        'email',
        'phone_number',
        'lease_start_date',
        'lease_end_date',
        'status',
    ];

    protected $casts = [
        'lease_start_date' => 'date',
        'lease_end_date' => 'date',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
