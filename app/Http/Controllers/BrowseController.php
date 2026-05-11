<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrowseController extends Controller
{
    /**
     * Display all available vendors and their menus.
     */
    public function index()
    {
        $vendors = Vendor::where('is_open', true)
            ->with(['categories.items'])
            ->get();

        return Inertia::render('Student/Browse', [
            'vendors' => $vendors,
        ]);
    }
}
