<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'tenant_id',
        'building_id', // Added
        'unit_id',
        'type',
        'category',    // Added
        'amount',
        'status',
        'payment_method',
        'date',        // Added
        'due_date',
        'paid_at',
        'description',
    ];

    protected $casts = [
        'date'     => 'date',
        'due_date' => 'date',
        'paid_at'  => 'date',
        'amount'   => 'decimal:2',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }
}