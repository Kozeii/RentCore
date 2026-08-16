<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'amount',
        'payment_method',
        'transaction_id',
        'payment_date',
        'status',
    ];

    protected $casts = [
        'payment_date' => 'date',
    ];
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
