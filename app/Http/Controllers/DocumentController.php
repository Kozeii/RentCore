<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('Documents/Index');
    }
}