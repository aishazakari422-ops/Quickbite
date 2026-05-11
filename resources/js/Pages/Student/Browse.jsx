import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Search, MapPin, Star, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Browse({ vendors }) {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [cart, setCart] = useState([]);

    const addToCart = (item, vendor) => {
        // If adding from a different vendor, clear the cart (typical food app logic)
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

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        router.post(route('order.store'), {
            vendor_id: cart[0].vendor_id,
            items: cart,
            total_price: cartTotal,
        });
    };

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
                            placeholder="Search for vendors or food..."
                            className="w-full pl-10 pr-4 py-2 bg-white border-gray-200 rounded-xl focus:border-brand-primary focus:ring-brand-primary shadow-sm"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Browse Food" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Vendors List */}
                <div className={`${selectedVendor ? 'lg:col-span-4 hidden lg:block' : 'lg:col-span-12'} space-y-6`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vendors.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400 italic text-xl font-medium">No vendors are open right now. Check back later!</p>
                            </div>
                        )}
                        {vendors.map((vendor) => (
                            <div 
                                key={vendor.id} 
                                onClick={() => setSelectedVendor(vendor)}
                                className={`bg-white rounded-3xl p-6 shadow-sm border transition-all cursor-pointer group hover:shadow-premium ${
                                    selectedVendor?.id === vendor.id ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-gray-100'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-brand-primary/10 p-3 rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
                                        <MapPin className="w-6 h-6 text-brand-primary" />
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                                        <span className="text-xs font-bold text-yellow-700">4.8</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors mb-2">
                                    {vendor.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                    {vendor.description || 'No description provided.'}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">Open Now</span>
                                    <div className="flex items-center text-brand-primary font-bold text-sm">
                                        View Menu <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vendor Menu Detail */}
                {selectedVendor && (
                    <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden">
                            <div className="p-8 bg-brand-dark text-white relative">
                                <button 
                                    onClick={() => setSelectedVendor(null)}
                                    className="lg:hidden absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20"
                                >
                                    <ChevronRight className="w-6 h-6 rotate-180" />
                                </button>
                                <h3 className="text-3xl font-black mb-2">{selectedVendor.name}</h3>
                                <p className="text-gray-400 max-w-lg">{selectedVendor.description}</p>
                            </div>

                            <div className="p-8">
                                {selectedVendor.categories.length === 0 ? (
                                    <p className="text-center py-10 text-gray-400 italic">This vendor hasn't added any menu items yet.</p>
                                ) : (
                                    <div className="space-y-10">
                                        {selectedVendor.categories.map((category) => (
                                            <div key={category.id}>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-2">
                                                    <span className="w-8 h-px bg-brand-primary/30"></span>
                                                    {category.name}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {category.items.map((item) => (
                                                        <div key={item.id} className="bg-brand-surface p-6 rounded-2xl border border-gray-100 hover:border-brand-primary/30 transition-all group">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-1">
                                                                    <h5 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{item.name}</h5>
                                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                                                </div>
                                                                <p className="font-black text-brand-dark">₦{item.price}</p>
                                                            </div>
                                                            <button 
                                                                onClick={() => addToCart(item, selectedVendor)}
                                                                className="w-full mt-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                                                            </button>
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

            {/* Floating Cart Summary */}
            {cart.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 animate-in slide-in-from-bottom duration-500 z-50">
                    <div className="bg-brand-dark text-white rounded-3xl p-6 shadow-2xl flex items-center justify-between border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <ShoppingCart className="w-8 h-8 text-brand-primary" />
                                <span className="absolute -top-2 -right-2 bg-white text-brand-dark text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Your Order</p>
                                <p className="text-xl font-black">₦{cartTotal.toLocaleString()}</p>
                            </div>
                        </div>
                        <button 
                            className="bg-brand-primary px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
