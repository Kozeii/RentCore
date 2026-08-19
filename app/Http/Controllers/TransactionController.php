<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Tenant;
use App\Models\Building;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Finance/Index', [
            'transactions' => Transaction::with(['tenant', 'unit'])
                ->latest()
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Finance/Create', [
            'tenants'   => Tenant::select('id', 'full_name')->get(),
            'buildings' => Building::select('id', 'name')->get(),
            'units'     => Unit::select('id', 'unit_number', 'building_id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description'    => 'required|string|max:255',
            'type'           => 'required|in:income,expense',
            'category'       => 'required|string',
            'amount'         => 'required|numeric|min:0',
            'date'           => 'required|date',
            'tenant_id'      => 'nullable|exists:tenants,id', 
            'building_id'    => 'nullable|exists:buildings,id',
            'unit_id'        => 'nullable|exists:units,id',
            'payment_method' => 'nullable|string',
            'status'         => 'required|in:completed,pending,failed',
        ]);

        Transaction::create($validated);

        return redirect()->route('transactions.index')
            ->with('message', 'Transaction added successfully!');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return redirect()->route('finance.index')
            ->with('message', 'Transaction deleted successfully!');
    }
}