import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Utensils, ShoppingBag, Clock, Star } from 'lucide-react';

export default function Dashboard({ hasShop, orders = [] }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-brand-dark">
                    Welcome back, <span className="text-brand-primary">{user.name.split(' ')[0]}</span>!
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Vendor Shop Setup Prompt */}
                {user.role === 'vendor' && !hasShop && (
                    <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-brand-dark">Finish your shop profile!</h3>
                            <p className="text-gray-600">You need to set up your shop details before you can add menu items.</p>
                        </div>
                        <Link href={route('vendor.setup')} className="btn-premium mt-4 md:mt-0 bg-brand-secondary">
                            Setup My Shop
                        </Link>
                    </div>
                )}

                {/* Vendor Orders Section */}
                {user.role === 'vendor' && hasShop && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-brand-dark flex items-center gap-2">
                            Incoming <span className="text-brand-primary">Orders</span>
                        </h3>
                        
                        {orders.length === 0 ? (
                            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
                                <p className="text-gray-400 italic">No orders yet. They'll show up here as soon as students start buying!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-premium transition-shadow">
                                        <div className="p-6 bg-brand-surface border-b border-gray-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Order #{order.id}</p>
                                                <p className="font-black text-brand-dark">{order.user.name}</p>
                                            </div>
                                            <span className="bg-yellow-400/10 text-yellow-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="p-6 space-y-3">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        <span className="font-bold text-brand-dark">{item.quantity}x</span> {item.menu_item.name}
                                                    </span>
                                                    <span className="font-bold text-brand-dark">₦{(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                                                <p className="font-black text-lg text-brand-primary">Total: ₦{order.total_price.toLocaleString()}</p>
                                                <button className="px-4 py-2 bg-brand-primary text-white text-xs font-black rounded-xl hover:scale-105 transition-transform">
                                                    Mark Ready
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {/* Hero Section */}
                <div className="bg-white rounded-3xl p-8 shadow-premium border border-gray-100 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                    <div className="z-10 max-w-lg">
                        <h3 className="text-3xl font-extrabold text-brand-dark mb-4">
                            Craving something delicious?
                        </h3>
                        <p className="text-gray-500 mb-6 text-lg">
                            Browse the best food stalls on campus and get your meal ready in minutes.
                        </p>
                        <Link href={route('student.browse')} className="btn-premium">
                            Browse Menus
                        </Link>
                    </div>
                    <div className="mt-8 md:mt-0 relative">
                        <div className="w-64 h-64 bg-brand-primary/10 rounded-full flex items-center justify-center">
                            <Utensils className="w-32 h-32 text-brand-primary opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Quick Stats / Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-brand-primary/50 transition-colors cursor-pointer group">
                        <div className="bg-brand-primary/10 p-4 rounded-xl group-hover:bg-brand-primary/20 transition-colors">
                            <ShoppingBag className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Recent Orders</p>
                            <p className="text-xl font-bold text-brand-dark">0 Orders</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-brand-secondary/50 transition-colors cursor-pointer group">
                        <div className="bg-brand-secondary/10 p-4 rounded-xl group-hover:bg-brand-secondary/20 transition-colors">
                            <Clock className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Wait Time</p>
                            <p className="text-xl font-bold text-brand-dark">~15 Mins</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-yellow-400/50 transition-colors cursor-pointer group">
                        <div className="bg-yellow-400/10 p-4 rounded-xl group-hover:bg-yellow-400/20 transition-colors">
                            <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Top Rated</p>
                            <p className="text-xl font-bold text-brand-dark">4.8 Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
