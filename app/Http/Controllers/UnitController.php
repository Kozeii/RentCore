<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of units with their associated building details.
     */
    public function index()
    {
        return Inertia::render('Units/Index', [
            'units' => Unit::with('building')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new unit (passes buildings for dropdown selection).
     */
    public function create()
    {
        return Inertia::render('Units/Create', [
            'buildings' => Building::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created unit in PostgreSQL.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'building_id' => 'required|exists:buildings,id',
            'unit_number' => 'required|string|max:50',
            'rent_amount' => 'required|numeric|min:0',
            'status'      => 'required|in:vacant,occupied,maintenance',
            'description'  => 'nullable|string',
        ]);

        Unit::create($validated);

        return redirect()->route('units.index')
            ->with('message', 'Unit created successfully!');
    }

    /**
     * Display a specific unit.
     */
    public function show(Unit $unit)
    {
        return Inertia::render('Units/Show', [
            'unit' => $unit->load('building'),
        ]);
    }

    /**
     * Show the form for editing an existing unit.
     */
    public function edit(Unit $unit)
    {
        return Inertia::render('Units/Edit', [
            'unit' => $unit,
            'buildings' => Building::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified unit in PostgreSQL.
     */
    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'building_id' => 'required|exists:buildings,id',
            'unit_number' => 'required|string|max:50',
            'rent_amount' => 'required|numeric|min:0',
            'status'      => 'required|in:vacant,occupied,maintenance',
            'description' => 'nullable|string',
        ]);

        $unit->update($validated);

        return redirect()->route('units.index')
            ->with('message', 'Unit updated successfully!');
    }

    /**
     * Remove the unit from PostgreSQL.
     */
    public function destroy(Unit $unit)
    {
        $unit->delete();

        return redirect()->route('units.index')
            ->with('message', 'Unit deleted successfully!');
    }
}