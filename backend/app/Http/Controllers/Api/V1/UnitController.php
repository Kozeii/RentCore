<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Building;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * GET /api/v1/units
     * Supports optional filtering: ?building_id=1&status=vacant
     */
    public function index(Request $request)
    {
        $query = Unit::with('building');

        // Optional filtering based on migration fields
        if ($request->has('building_id')) {
            $query->where('building_id', $request->query('building_id'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        $units = $query->get()->map(function ($unit) {
            return [
                'id'            => $unit->id,
                'building_id'   => $unit->building_id,
                'building_name' => $unit->building->name ?? null,
                'unit_number'   => $unit->unit_number,
                'monthly_rent'  => (float) $unit->monthly_rent,
                'status'        => $unit->status,
                'created_at'    => $unit->created_at?->toISOString(),
            ];
        });

        return $this->sendResponse($units, 'Units retrieved successfully');
    }

    /**
     * GET /api/v1/units/{id}
     */
    public function show($id)
    {
        $unit = Unit::with('building')->find($id);

        if (!$unit) {
            return $this->sendError('Resource not found', [], 404);
        }

        return $this->sendResponse([
            'id'            => $unit->id,
            'building_id'   => $unit->building_id,
            'building_name' => $unit->building->name ?? null,
            'unit_number'   => $unit->unit_number,
            'monthly_rent'  => (float) $unit->monthly_rent,
            'status'        => $unit->status,
            'created_at'    => $unit->created_at?->toISOString(),
        ], 'Unit retrieved successfully');
    }

    /**
     * POST /api/v1/units
     */
    public function store(Request $request)
    {
        // Validation matching migration constraints
        $validated = $request->validate([
            'building_id'  => 'required|exists:buildings,id',
            'unit_number'  => 'required|string|max:255',
            'monthly_rent' => 'required|numeric|min:0',
            'status'       => 'nullable|in:vacant,occupied', // Enforces enum values
        ]);

        $unit = Unit::create([
            'building_id'  => $validated['building_id'],
            'unit_number'  => $validated['unit_number'],
            'monthly_rent' => $validated['monthly_rent'],
            'status'       => $validated['status'] ?? 'vacant', // Defaults to 'vacant'
        ]);

        // Increment building total_units count
        Building::where('id', $unit->building_id)->increment('total_units');

        $unit->load('building');

        return $this->sendResponse([
            'id'            => $unit->id,
            'building_id'   => $unit->building_id,
            'building_name' => $unit->building->name ?? null,
            'unit_number'   => $unit->unit_number,
            'monthly_rent'  => (float) $unit->monthly_rent,
            'status'        => $unit->status,
            'created_at'    => $unit->created_at?->toISOString(),
        ], 'Unit created successfully', 201);
    }

    /**
     * PUT /api/v1/units/{id}
     */
    public function update(Request $request, $id)
    {
        $unit = Unit::find($id);

        if (!$unit) {
            return $this->sendError('Resource not found', [], 404);
        }

        $validated = $request->validate([
            'building_id'  => 'sometimes|required|exists:buildings,id',
            'unit_number'  => 'sometimes|required|string|max:255',
            'monthly_rent' => 'sometimes|required|numeric|min:0',
            'status'       => 'sometimes|required|in:vacant,occupied',
        ]);

        $unit->update($validated);
        $unit->load('building');

        return $this->sendResponse([
            'id'            => $unit->id,
            'building_id'   => $unit->building_id,
            'building_name' => $unit->building->name ?? null,
            'unit_number'   => $unit->unit_number,
            'monthly_rent'  => (float) $unit->monthly_rent,
            'status'        => $unit->status,
            'updated_at'    => $unit->updated_at?->toISOString(),
        ], 'Unit updated successfully');
    }

    /**
     * DELETE /api/v1/units/{id}
     */
    public function destroy($id)
    {
        $unit = Unit::find($id);

        if (!$unit) {
            return $this->sendError('Resource not found', [], 404);
        }

        // Decrement parent building total_units count
        Building::where('id', $unit->building_id)->decrement('total_units');

        $unit->delete();

        return $this->sendResponse([], 'Unit deleted successfully');
    }
}