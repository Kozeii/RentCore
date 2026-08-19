<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\Building;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        return Inertia::render('Tenants/Index', [
            'tenants' => Tenant::with(['building', 'unit'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tenants/Create', [
            'buildings' => Building::select('id', 'name')->get(),
            'units'     => Unit::select('id', 'unit_number', 'building_id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'    => 'required|string|max:255',
            'email'        => 'required|email|max:255|unique:tenants,email',
            'phone'        => 'required|string|max:50',
            'status'       => 'required|string',
            'building_id'  => 'nullable|exists:buildings,id',
            'unit_id'      => 'nullable|exists:units,id',
            'monthly_rent' => 'nullable|numeric|min:0',
            'deposit'      => 'nullable|numeric|min:0',
            'lease_start'  => 'nullable|date',
            'lease_end'    => 'nullable|date|after_or_equal:lease_start',
        ]);

        Tenant::create($validated);

        return redirect()->route('tenants.index')
            ->with('message', 'Tenant onboarded successfully!');
    }

    public function show(Tenant $tenant)
    {
        return Inertia::render('Tenants/Show', [
            'tenant' => $tenant->load(['building', 'unit']),
        ]);
    }

    public function edit(Tenant $tenant)
    {
        return Inertia::render('Tenants/Edit', [
            'tenant'    => $tenant,
            'buildings' => Building::select('id', 'name')->get(),
            'units'     => Unit::select('id', 'unit_number', 'building_id')->get(),
        ]);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'full_name'    => 'required|string|max:255',
            'email'        => 'required|email|max:255|unique:tenants,email,' . $tenant->id,
            'phone'        => 'required|string|max:50',
            'status'       => 'required|string',
            'building_id'  => 'nullable|exists:buildings,id',
            'unit_id'      => 'nullable|exists:units,id',
            'monthly_rent' => 'nullable|numeric|min:0',
            'deposit'      => 'nullable|numeric|min:0',
            'lease_start'  => 'nullable|date',
            'lease_end'    => 'nullable|date|after_or_equal:lease_start',
        ]);

        $tenant->update($validated);

        return redirect()->route('tenants.index')
            ->with('message', 'Tenant updated successfully!');
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();

        return redirect()->route('tenants.index')
            ->with('message', 'Tenant removed successfully!');
    }
}