<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class VendorController extends Controller
{
    /**
     * Show the vendor shop setup page.
     */
    public function create()
    {
        // Only allow vendors to setup a shop
        if (Auth::user()->role !== 'vendor') {
            return redirect()->route('dashboard')->with('error', 'Only vendors can set up a shop.');
        }

        return Inertia::render('Vendor/Setup');
    }

    /**
     * Store a new vendor record.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Vendor::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'is_open' => true,
        ]);

        return redirect()->route('dashboard')->with('message', 'Shop setup successfully!');
    }
}
