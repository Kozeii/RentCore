<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Unit;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    /**
     * GET /api/v1/tenants
     * Retrieves all tenants with their assigned unit and building details.
     */
    public function index()
    {
        $tenants = Tenant::with('unit.building')->get()->map(function ($tenant) {
            return [
                'id'               => $tenant->id,
                'full_name'        => $tenant->full_name,
                'email'            => $tenant->email,
                'phone_number'     => $tenant->phone_number,
                'status'           => $tenant->status,
                'lease_start_date' => $tenant->lease_start_date?->format('Y-m-d'),
                'lease_end_date'   => $tenant->lease_end_date?->format('Y-m-d'),
                'unit'             => $tenant->unit ? [
                    'id'            => $tenant->unit->id,
                    'unit_number'   => $tenant->unit->unit_number,
                    'building_name' => $tenant->unit->building->name ?? null,
                ] : null,
            ];
        });

        return $this->sendResponse($tenants, 'Tenants retrieved successfully');
    }

    /**
     * GET /api/v1/tenants/{id}
     * Retrieves a single tenant along with unit and payment history.
     */
    public function show($id)
    {
        $tenant = Tenant::with(['unit.building', 'payments'])->find($id);

        if (!$tenant) {
            return $this->sendError('Tenant not found', [], 404);
        }

        return $this->sendResponse([
            'id'               => $tenant->id,
            'full_name'        => $tenant->full_name,
            'email'            => $tenant->email,
            'phone_number'     => $tenant->phone_number,
            'status'           => $tenant->status,
            'lease_start_date' => $tenant->lease_start_date?->format('Y-m-d'),
            'lease_end_date'   => $tenant->lease_end_date?->format('Y-m-d'),
            'unit'             => $tenant->unit ? [
                'id'            => $tenant->unit->id,
                'unit_number'   => $tenant->unit->unit_number,
                'building_name' => $tenant->unit->building->name ?? null,
            ] : null,
            'payments'         => $tenant->payments,
        ], 'Tenant retrieved successfully');
    }

    /**
     * POST /api/v1/tenants
     * Registers a new tenant and marks the assigned unit as "occupied".
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_id'          => 'required|exists:units,id',
            'full_name'        => 'required|string|max:255',
            'email'            => 'required|email|unique:tenants,email',
            'phone_number'     => 'required|string|max:20',
            'lease_start_date' => 'required|date',
            'lease_end_date'   => 'required|date|after:lease_start_date',
            'status'           => 'nullable|string|in:active,inactive',
        ]);

        $tenant = Tenant::create([
            'unit_id'          => $validated['unit_id'],
            'full_name'        => $validated['full_name'],
            'email'            => $validated['email'],
            'phone_number'     => $validated['phone_number'],
            'lease_start_date' => $validated['lease_start_date'],
            'lease_end_date'   => $validated['lease_end_date'],
            'status'           => $validated['status'] ?? 'active',
        ]);

        // State Automation: Mark the assigned unit as "occupied" and increment building counter
        $unit = Unit::find($validated['unit_id']);
        if ($unit) {
            $unit->update(['status' => 'occupied']);
            $unit->building()->increment('occupied_units');
        }

        $tenant->load('unit.building');

        return $this->sendResponse([
            'id'               => $tenant->id,
            'full_name'        => $tenant->full_name,
            'email'            => $tenant->email,
            'phone_number'     => $tenant->phone_number,
            'status'           => $tenant->status,
            'lease_start_date' => $tenant->lease_start_date?->format('Y-m-d'),
            'lease_end_date'   => $tenant->lease_end_date?->format('Y-m-d'),
            'unit'             => [
                'id'            => $tenant->unit->id,
                'unit_number'   => $tenant->unit->unit_number,
                'building_name' => $tenant->unit->building->name ?? null,
            ],
        ], 'Tenant registered successfully', 201);
    }

    /**
     * PUT /api/v1/tenants/{id}
     * Updates tenant details.
     */
    public function update(Request $request, $id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return $this->sendError('Tenant not found', [], 404);
        }

        $validated = $request->validate([
            'unit_id'          => 'sometimes|required|exists:units,id',
            'full_name'        => 'sometimes|required|string|max:255',
            'email'            => 'sometimes|required|email|unique:tenants,email,' . $tenant->id,
            'phone_number'     => 'sometimes|required|string|max:20',
            'lease_start_date' => 'sometimes|required|date',
            'lease_end_date'   => 'sometimes|required|date|after:lease_start_date',
            'status'           => 'sometimes|required|string|in:active,inactive',
        ]);

        $tenant->update($validated);

        return $this->sendResponse($tenant, 'Tenant updated successfully');
    }

    /**
     * DELETE /api/v1/tenants/{id}
     * Deletes a tenant record and resets unit status back to "vacant".
     */
    public function destroy($id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return $this->sendError('Tenant not found', [], 404);
        }

        // State Automation: Free up unit and adjust building occupancy when tenant leaves
        if ($tenant->unit) {
            $tenant->unit->update(['status' => 'vacant']);
            $tenant->unit->building()->decrement('occupied_units');
        }

        $tenant->delete();

        return $this->sendResponse([], 'Tenant deleted successfully');
    }
}