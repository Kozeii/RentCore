<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BuildingController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\TenantController;
use App\Http\Controllers\Api\V1\UnitController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| RentCore API Routes (v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // --------------------------------------------------------------------
    // Public Routes
    // --------------------------------------------------------------------
    Route::post('/auth/login', [AuthController::class, 'login']);

    // --------------------------------------------------------------------
    // Protected Routes (Requires Sanctum Bearer Token)
    // --------------------------------------------------------------------
    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // Buildings (Full CRUD)
        Route::get('/buildings', [BuildingController::class, 'index']);
        Route::post('/buildings', [BuildingController::class, 'store']);
        Route::get('/buildings/{id}', [BuildingController::class, 'show']);
        Route::put('/buildings/{id}', [BuildingController::class, 'update']);
        Route::delete('/buildings/{id}', [BuildingController::class, 'destroy']);

        // Units (Full CRUD)
        Route::get('/units', [UnitController::class, 'index']);
        Route::post('/units', [UnitController::class, 'store']);
        Route::get('/units/{id}', [UnitController::class, 'show']);
        Route::put('/units/{id}', [UnitController::class, 'update']);
        Route::delete('/units/{id}', [UnitController::class, 'destroy']);

        // Tenants (Full CRUD)
        Route::get('/tenants', [TenantController::class, 'index']);
        Route::post('/tenants', [TenantController::class, 'store']);
        Route::get('/tenants/{id}', [TenantController::class, 'show']);
        Route::put('/tenants/{id}', [TenantController::class, 'update']);
        Route::delete('/tenants/{id}', [TenantController::class, 'destroy']);

        // Payments (Full CRUD)
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::post('/payments', [PaymentController::class, 'store']);
    });
});