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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'zip_code' => 'required|string|max:20',
        ]);

        Building::create($validated);
        return redirect()->route('buildings.index')->with('success', 'Building added!');
    }

    public function show(Building $building)
    {
        return Inertia::render('Buildings/Show', [
            'building' => $building
        ]);
    }

    public function edit(Building $building)
    {
        return Inertia::render('Buildings/Edit', [
            'building' => $building
        ]);
    }

    public function update(Request $request, Building $building)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'zip_code' => 'required|string|max:20',
        ]);

        $building->update($validated);
        return redirect()->route('buildings.index')->with('success', 'Building updated!');
    }

    public function destroy(Building $building)
    {
        $building->delete();
        return redirect()->route('buildings.index')->with('success', 'Building deleted!');
    }
}