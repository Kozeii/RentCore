<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        return Inertia::render('Tenants/Index');
    }

    public function create()
    {
        return Inertia::render('Tenants/Create');
    }
}