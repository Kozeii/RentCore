<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Building;
use Illuminate\Http\Request;


class BuildingController extends Controller
{
    /**
     * GET /api/v1/buildings
     * Retrieves a list of all buildings.
     */
    public function index()
    {
        $buildings = Building::all();

        return $this->sendResponse($buildings, 'Buildings retrieved successfully.');
    }

    /**
     * GET /api/v1/buildings/{id}
     * Retrieves single building details.
     */
    public function show($id)
    {
        $building = Building::find($id);

        if (is_null($building)) {
            return $this->sendError('Building not found.');
        }

        return $this->sendResponse($building, 'Building retrieved successfully.');
    }
    /**
     * POST /api/v1/buildings
     * Creates a new building record.
     */


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            // Add other fields as necessary
        ]);
        $building = Building::create([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'total_units' => 0,
            'occupied_units' => 0,

            // Add other fields as necessary
        ]);
       return $this->sendResponse([
        'id'             => $building->id,
        'name'           => $building->name,
        'address'        => $building->address,
        'total_units'    => (int) $building->total_units,
        'occupied_units' => (int) $building->occupied_units,
        'created_at'     => $building->created_at?->toISOString(),
    ], 'Building created successfully', 201);
    }
    
    /**
     * PUT /api/v1/buildings/{id}
     */

    public function update(Request $request, $id)
    {
        $building = Building::find($id);

        if (!$building) {
            return $this->sendError('Building not found.', [], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'total_units' => 'sometimes|required|integer',
            'occupied_units' => 'sometimes|required|integer',
        ]);
        $building->update($validatedData);

        return $this->sendResponse(
            $building,
            'Building updated successfully.'
        );
    }

    /**
     * DELETE /api/v1/buildings/{id}
     */

    public function destroy($id)
    {
        $building = Building::find($id);
        if (! $building) {
            return $this->sendError('Building not found.', [], 404);
        }
        $building->delete();
        return $this->sendResponse([], 'Building deleted successfully.');
    }
}
