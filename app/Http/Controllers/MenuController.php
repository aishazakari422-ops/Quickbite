<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display the vendor's menu management page.
     */
    public function index()
    {
        $vendor = Auth::user()->vendor;

        if (!$vendor) {
            return redirect()->route('vendor.setup');
        }

        $categories = Category::where('vendor_id', $vendor->id)
            ->with('items')
            ->get();

        return Inertia::render('Vendor/Menu', [
            'vendor' => $vendor,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new category.
     */
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Category::create([
            'vendor_id' => Auth::user()->vendor->id,
            'name' => $request->name,
        ]);

        return back()->with('message', 'Category created!');
    }

    /**
     * Store a new menu item.
     */
    public function storeItem(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'preparation_time' => 'nullable|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads/menu'), $filename);
            $imageUrl = '/uploads/menu/' . $filename;
        }

        MenuItem::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'preparation_time' => $request->preparation_time,
            'image_url' => $imageUrl,
            'is_available' => true,
        ]);

        return back()->with('message', 'Item added to menu!');
    }

    /**
     * Update an existing category.
     */
    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return back()->with('message', 'Category updated!');
    }

    /**
     * Delete a category and its items.
     */
    public function destroyCategory(Category $category)
    {
        $category->delete();
        return back()->with('message', 'Category deleted!');
    }

    /**
     * Toggle availability of a specific menu item.
     */
    public function toggleItemAvailability(MenuItem $item)
    {
        // Ensure vendor owns this item
        if ($item->category && $item->category->vendor_id === Auth::user()->vendor?->id) {
            $item->update([
                'is_available' => !$item->is_available,
            ]);
            $status = $item->is_available ? 'in stock' : 'sold out';
            return back()->with('message', "Item marked as {$status}!");
        }

        return back()->with('error', 'Unauthorized action.');
    }

    /**
     * Delete a specific menu item.
     */
    public function destroyItem(MenuItem $item)
    {
        $item->delete();
        return back()->with('message', 'Item deleted!');
    }
}
