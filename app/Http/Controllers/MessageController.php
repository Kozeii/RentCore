<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Messages/Index');
    }
}