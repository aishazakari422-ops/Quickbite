<?php

use App\Http\Controllers\BrowseController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $data = [
        'hasShop' => $user->role === 'vendor' ? !!$user->vendor : false,
    ];

    if ($user->role === 'vendor' && $user->vendor) {
        $data['orders'] = Order::where('vendor_id', $user->vendor->id)
            ->with(['user', 'items.menuItem'])
            ->latest()
            ->get();
            
        $data['analytics'] = [
            'total_revenue' => Order::where('vendor_id', $user->vendor->id)->where('status', 'completed')->sum('total_amount'),
            'active_orders' => Order::where('vendor_id', $user->vendor->id)->whereIn('status', ['pending', 'preparing', 'ready'])->count(),
        ];
    } elseif ($user->role === 'student') {
        $data['orders'] = Order::where('user_id', $user->id)
            ->with(['vendor', 'items.menuItem'])
            ->latest()
            ->get();
    }

    return Inertia::render('Dashboard', $data);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Student Routes
    Route::get('/browse', [BrowseController::class, 'index'])->name('student.browse');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');

    // Vendor Routes
    Route::patch('/vendor/order/{order}/status', [OrderController::class, 'updateStatus'])->name('vendor.order.status.update');
    Route::get('/vendor/setup', [VendorController::class, 'create'])->name('vendor.setup');
    Route::post('/vendor/setup', [VendorController::class, 'store'])->name('vendor.store');

    // Menu Management Routes
    Route::get('/vendor/menu', [MenuController::class, 'index'])->name('vendor.menu');
    Route::post('/vendor/menu/category', [MenuController::class, 'storeCategory'])->name('vendor.category.store');
    Route::patch('/vendor/menu/category/{category}', [MenuController::class, 'updateCategory'])->name('vendor.category.update');
    Route::delete('/vendor/menu/category/{category}', [MenuController::class, 'destroyCategory'])->name('vendor.category.destroy');
    Route::post('/vendor/menu/item', [MenuController::class, 'storeItem'])->name('vendor.item.store');
    Route::delete('/vendor/menu/item/{item}', [MenuController::class, 'destroyItem'])->name('vendor.item.destroy');
    Route::patch('/vendor/menu/item/{item}/toggle', [MenuController::class, 'toggleItemAvailability'])->name('vendor.item.toggle');
});

require __DIR__.'/auth.php';
