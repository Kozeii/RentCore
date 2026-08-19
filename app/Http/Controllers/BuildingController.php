<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function index()
    {
        return Inertia::render('Buildings/Index', [
            'buildings' => Building::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Buildings/Create');
    }
    /**
     * Store a newly created building in PostgreSQL.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'zip_code' => 'required|string|max:10',
            'description'=>'nullable|string',
        ]);

        Building::create($validated);
        return redirect()->route('buildings.index')->with('success', 'Building successfully added!');
    }
    /**
     * Display a specific building.
     */
    public function show(Building $building)
    {
        return Inertia::render('Buildings/Show', [
            'building' => $building
        ]);
    }
    /**
     * Show the form for editing an existing building.
     */
    public function edit(Building $building)
    {
        return Inertia::render('Buildings/Edit', [
            'building' => $building
        ]);
    }
    /**
     * Update the building in PostgreSQL.
     */
    public function update(Request $request, Building $building)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'province' => 'required|string|max:100',
            'zip_code' => 'required|string|max:20',
            'description'=>'nullable|string',
        ]);

        $building->update($validated);
        return redirect()->route('buildings.index')->with('success', 'Building updated!');
    }
/**
     * Remove the building from PostgreSQL.
     */
    public function destroy(Building $building)
    {
        $building->delete();
        return redirect()->route('buildings.index')->with('success', 'Building deleted!');
    }
}