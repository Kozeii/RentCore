<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Fetch all payments (Optionally filter by tenant_id)
     */
    public function index(Request $request)
    {
        $query = Payment::with('tenant');

        if ($request->has('tenant_id')) {
            $query->where('tenant_id', $request->tenant_id);
        }

        $payments = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Payments retrieved successfully',
            'data'    => $payments,
        ], 200);
    }

    /**
     * Record a new payment
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'tenant_id'      => 'required|exists:tenants,id',
        'amount'         => 'required|numeric|min:0',
        'payment_method' => 'required|in:cash,e-wallets,credit_card,bank_transfer,check',
        'transaction_id' => 'nullable|string|max:255',
        'payment_date'   => 'required|date',
        'status'         => 'nullable|in:pending,completed,failed',
    ]);

    $payment = Payment::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Payment recorded successfully',
        'data'    => $payment->load('tenant'),
    ], 201);
}
}