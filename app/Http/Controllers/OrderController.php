<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Store a new order in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric',
        ]);

        return DB::transaction(function () use ($request) {
            $order = Order::create([
                'user_id' => Auth::id(),
                'vendor_id' => $request->vendor_id,
                'total_amount' => $request->total_price,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            return redirect()->route('dashboard')->with('message', 'Order placed successfully!');
        });
    }

    /**
     * Update the status of an order.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,preparing,ready,completed,cancelled',
        ]);

        // Ensure the vendor owns this order
        if (Auth::user()->vendor && Auth::user()->vendor->id === $order->vendor_id) {
            $order->update(['status' => $request->status]);
            return back()->with('message', 'Order status updated to ' . $request->status . '!');
        }

        return back()->with('error', 'Unauthorized action.');
    }
}
