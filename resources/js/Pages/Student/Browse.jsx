import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Search, MapPin, Star, ChevronRight, ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Browse({ vendors = [] }) {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    // Live search filter across vendors and food menus
    const filteredVendors = useMemo(() => {
        if (!searchQuery.trim()) return vendors;
        const q = searchQuery.toLowerCase().trim();
        return vendors.filter(vendor => {
            const nameMatch = vendor.name?.toLowerCase().includes(q);
            const descMatch = vendor.description?.toLowerCase().includes(q);
            const menuMatch = vendor.categories?.some(cat => 
                cat.name?.toLowerCase().includes(q) ||
                cat.items?.some(item => 
                    item.name?.toLowerCase().includes(q) ||
                    item.description?.toLowerCase().includes(q)
                )
            );
            return nameMatch || descMatch || menuMatch;
        });
    }, [vendors, searchQuery]);

    const addToCart = (item, vendor) => {
        if (item.is_available === false) return;

        // If adding from a different vendor, prompt user
        if (cart.length > 0 && cart[0].vendor_id !== vendor.id) {
            if (confirm('Adding items from a different vendor will clear your current cart. Continue?')) {
                setCart([{ ...item, quantity: 1, vendor_id: vendor.id, vendor_name: vendor.name }]);
            }
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.id === item.id);
            if (existingItem) {
                return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevCart, { ...item, quantity: 1, vendor_id: vendor.id, vendor_name: vendor.name }];
        });
    };

    const updateQuantity = (itemId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === itemId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        router.post(route('order.store'), {
            vendor_id: cart[0].vendor_id,
            items: cart,
            total_price: cartTotal,
        });
    };

    // Filter categories of selected vendor based on search query
    const displayCategories = useMemo(() => {
        if (!selectedVendor) return [];
        if (!searchQuery.trim()) return selectedVendor.categories || [];
        const q = searchQuery.toLowerCase().trim();
        return (selectedVendor.categories || []).map(cat => ({
            ...cat,
            items: (cat.items || []).filter(item => 
                item.name?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q) ||
                cat.name?.toLowerCase().includes(q)
            )
        })).filter(cat => cat.items.length > 0);
    }, [selectedVendor, searchQuery]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl font-bold leading-tight text-brand-dark">
                        Discover <span className="text-brand-primary">Delicious Food</span>
                    </h2>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search vendors or dishes (e.g. rice, burger)..."
                            className="w-full pl-10 pr-10 py-2.5 bg-white border-gray-200 rounded-xl focus:border-brand-primary focus:ring-brand-primary shadow-sm text-sm"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Browse Food" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Vendors List */}
                <div className={`${selectedVendor ? 'lg:col-span-4 hidden lg:block' : 'lg:col-span-12'} space-y-6`}>
                    {searchQuery && (
                        <div className="flex items-center justify-between text-sm text-gray-500 bg-white p-3 rounded-2xl border border-gray-100">
                            <span>Found <strong>{filteredVendors.length}</strong> {filteredVendors.length === 1 ? 'vendor' : 'vendors'} matching "{searchQuery}"</span>
                            <button onClick={() => setSearchQuery('')} className="text-brand-primary font-bold hover:underline text-xs">Clear</button>
                        </div>
                    )}

                    <div className={`grid gap-6 ${selectedVendor ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {filteredVendors.length === 0 && (
                            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 p-8">
                                <p className="text-gray-400 italic text-lg font-medium">No vendors found matching your search.</p>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="mt-4 px-4 py-2 bg-brand-primary/10 text-brand-primary font-bold rounded-xl text-sm hover:bg-brand-primary/20 transition-colors"
                                >
                                    Reset Search
                                </button>
                            </div>
                        )}
                        {filteredVendors.map((vendor) => {
                            const isSelected = selectedVendor?.id === vendor.id;
                            return (
                                <div 
                                    key={vendor.id} 
                                    onClick={() => setSelectedVendor(vendor)}
                                    className={`bg-white rounded-3xl transition-all cursor-pointer group border ${
                                        isSelected 
                                            ? 'border-brand-primary ring-1 ring-brand-primary shadow-sm bg-brand-surface' 
                                            : 'border-gray-100 hover:shadow-premium hover:border-gray-200'
                                    } ${selectedVendor ? 'p-4' : 'p-6'}`}
                                >
                                    <div className={`flex ${selectedVendor ? 'items-center gap-4' : 'flex-col gap-4'}`}>
                                        {/* Icon & Rating */}
                                        <div className="flex justify-between items-center w-full">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-brand-primary/10 p-3 rounded-2xl group-hover:bg-brand-primary/20 transition-colors flex-shrink-0">
                                                    <MapPin className="w-6 h-6 text-brand-primary" />
                                                </div>
                                                {selectedVendor && (
                                                    <div className="min-w-0">
                                                        <h3 className="text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1">
                                                            {vendor.name}
                                                        </h3>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <Star className="w-3.5 h-3.5 text-yellow-600 fill-yellow-600" />
                                                            <span className="text-xs font-bold text-yellow-700">4.8</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {!selectedVendor && (
                                                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                                    <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                                                    <span className="text-xs font-bold text-yellow-700">4.8</span>
                                                </div>
                                            )}
                                            {selectedVendor && (
                                                <div className="ml-auto flex-shrink-0">
                                                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-brand-primary translate-x-1' : 'text-gray-400'}`} />
                                                </div>
                                            )}
                                        </div>

                                        {!selectedVendor && (
                                            <>
                                                <div>
                                                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors mb-2">
                                                        {vendor.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {vendor.description || 'No description provided.'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase">Open Now</span>
                                                    <div className="flex items-center text-brand-primary font-bold text-sm">
                                                        View Menu <ChevronRight className="w-4 h-4 ml-1" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Vendor Menu Detail */}
                {selectedVendor && (
                    <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden">
                            {/* Vendor Header */}
                            <div className="p-6 md:p-8 bg-brand-dark text-white relative">
                                <button 
                                    onClick={() => setSelectedVendor(null)}
                                    className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                                    title="Close Menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-brand-primary/20 p-3 rounded-2xl">
                                        <MapPin className="w-6 h-6 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black">{selectedVendor.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1 max-w-lg">{selectedVendor.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-6 md:p-8">
                                {displayCategories.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <p className="italic font-medium">No menu items match your search for this vendor.</p>
                                        {searchQuery && (
                                            <button 
                                                onClick={() => setSearchQuery('')}
                                                className="mt-3 text-brand-primary font-bold hover:underline text-sm"
                                            >
                                                Clear search filter
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {displayCategories.map((category) => (
                                            <div key={category.id}>
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary mb-4 flex items-center gap-3">
                                                    <span className="w-6 h-px bg-brand-primary/40"></span>
                                                    {category.name}
                                                    <span className="text-gray-400 font-bold normal-case tracking-normal">({category.items.length})</span>
                                                </h4>
                                                <div className="space-y-3">
                                                    {category.items.map((item) => (
                                                        <div 
                                                            key={item.id} 
                                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                                                                item.is_available === false 
                                                                    ? 'bg-gray-50/70 border-gray-100 opacity-60' 
                                                                    : 'bg-brand-surface border-gray-100 hover:border-brand-primary/30 hover:shadow-sm'
                                                            }`}
                                                        >
                                                            {/* Thumbnail */}
                                                            {item.image_url && (
                                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                                    <img 
                                                                        src={item.image_url} 
                                                                        alt={item.name} 
                                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                                    />
                                                                </div>
                                                            )}

                                                            {/* Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <h5 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors text-sm md:text-base">
                                                                        {item.name}
                                                                    </h5>
                                                                    {item.is_available === false && (
                                                                        <span className="text-[10px] font-black uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                                            Sold Out
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                                                    {item.description}
                                                                </p>
                                                                <div className="flex items-center gap-3 mt-2">
                                                                    <span className="font-black text-brand-dark text-sm md:text-base">
                                                                        ₦{Number(item.price).toLocaleString()}
                                                                    </span>
                                                                    {item.preparation_time && (
                                                                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                                                                            ⏱ ~{item.preparation_time} min
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Add Button */}
                                                            {item.is_available === false ? (
                                                                <span className="text-xs font-bold text-gray-400 px-4 py-2 bg-gray-100 rounded-xl">
                                                                    Unavailable
                                                                </span>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => addToCart(item, selectedVendor)}
                                                                    className="flex-shrink-0 w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center justify-center gap-2 shadow-sm"
                                                                >
                                                                    <ShoppingCart className="w-4 h-4" />
                                                                    <span className="hidden md:inline">Add</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Cart Modal Overlay */}
            {showCart && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 bg-brand-dark text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black">Your <span className="text-brand-primary">Basket</span></h3>
                                <p className="text-gray-400 text-sm mt-0.5">{cart[0]?.vendor_name}</p>
                            </div>
                            <button onClick={() => setShowCart(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-3 rounded-2xl border border-gray-50 bg-gray-50/50 group">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <p className="font-bold text-brand-dark truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">₦{Number(item.price).toLocaleString()} each</p>
                                    </div>

                                    {/* Quantity Stepper */}
                                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                                        <button 
                                            type="button"
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-brand-primary hover:text-white flex items-center justify-center font-bold text-gray-600 transition-colors"
                                            title="Decrease quantity"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="w-6 text-center font-black text-brand-primary text-sm">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            type="button"
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-brand-primary hover:text-white flex items-center justify-center font-bold text-gray-600 transition-colors"
                                            title="Increase quantity"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Item Total & Delete */}
                                    <div className="flex items-center gap-3 pl-4">
                                        <p className="font-black text-brand-dark text-sm w-20 text-right">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 border-t border-gray-100 bg-brand-surface">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                                <span className="text-3xl font-black text-brand-dark">₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setCart([])}
                                    className="flex-1 py-4 text-gray-400 font-bold hover:text-red-500 transition-colors text-sm"
                                >
                                    Empty Cart
                                </button>
                                <button 
                                    onClick={handleCheckout}
                                    className="flex-[2] btn-premium py-4"
                                >
                                    Place Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Cart Summary */}
            {cart.length > 0 && !showCart && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 animate-in slide-in-from-bottom duration-500 z-50">
                    <div 
                        onClick={() => setShowCart(true)}
                        className="bg-brand-dark text-white rounded-3xl p-6 shadow-2xl flex items-center justify-between border border-white/10 cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <ShoppingCart className="w-8 h-8 text-brand-primary" />
                                <span className="absolute -top-2 -right-2 bg-white text-brand-dark text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Review Order</p>
                                <p className="text-xl font-black">₦{cartTotal.toLocaleString()}</p>
                            </div>
                        </div>
                        <button 
                            className="bg-brand-primary px-8 py-3 rounded-2xl font-black text-sm hover:brightness-110 transition"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
