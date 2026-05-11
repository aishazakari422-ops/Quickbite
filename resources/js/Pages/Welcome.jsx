import { Head, Link } from '@inertiajs/react';
import { Utensils, Zap, ShieldCheck, Clock } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-brand-surface selection:bg-brand-primary selection:text-white">
            <Head title="Welcome to QuickBite" />
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-primary p-2 rounded-lg">
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-brand-dark">Quick<span className="text-brand-primary">Bite</span></span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-premium">Go to Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-bold text-brand-dark hover:text-brand-primary transition-colors">Log in</Link>
                                <Link href={route('register')} className="btn-premium">Join Now</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full">
                            <Zap className="w-4 h-4 text-brand-primary" />
                            <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Fastest Delivery on Campus</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-brand-dark leading-[0.9] tracking-tighter">
                            Your Favorite <span className="text-brand-primary">Campus Meals</span> Delivered Fast.
                        </h1>
                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                            QuickBite connects you with the best food vendors on campus. Skip the queue and order your favorite meals in seconds.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href={route('register')} className="btn-premium px-10 py-5 text-lg">Start Ordering</Link>
                            <Link href="#features" className="px-10 py-5 text-lg font-bold text-gray-400 hover:text-brand-dark transition-colors">Learn More</Link>
                        </div>
                    </div>
                    <div className="relative h-[500px] lg:h-[600px]">
                        {/* Stacked Collage Cards */}
                        
                        {/* Card 1: Jollof Rice (Bottom) */}
                        <div className="absolute top-40 -left-10 w-64 bg-white p-3 rounded-3xl shadow-premium -rotate-12 hover:rotate-0 transition-transform duration-500 z-10">
                            <img 
                                src="https://images.unsplash.com/photo-1604328727766-a151d1045ab4?auto=format&fit=crop&q=80&w=600" 
                                className="w-full aspect-square object-cover rounded-2xl mb-3"
                                alt="Jollof Rice"
                            />
                            <div className="flex justify-between items-center px-1">
                                <span className="font-bold text-brand-dark">Jollof Rice</span>
                                <span className="text-brand-primary font-black">₦2,500</span>
                            </div>
                        </div>

                        {/* Card 2: Gourmet Burger (Middle/Main) */}
                        <div className="absolute top-10 left-20 w-72 bg-white p-3 rounded-3xl shadow-premium rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                            <img 
                                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600" 
                                className="w-full aspect-square object-cover rounded-2xl mb-3"
                                alt="Burger"
                            />
                            <div className="flex justify-between items-center px-1">
                                <span className="font-bold text-brand-dark">Gourmet Burger</span>
                                <span className="text-brand-primary font-black">₦3,800</span>
                            </div>
                        </div>

                        {/* Card 3: Fresh Juice (Top/Side) */}
                        <div className="absolute top-60 right-0 w-56 bg-white p-3 rounded-3xl shadow-premium rotate-12 hover:rotate-0 transition-transform duration-500 z-30">
                            <img 
                                src="https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=600" 
                                className="w-full aspect-square object-cover rounded-2xl mb-3"
                                alt="Juice"
                            />
                            <div className="flex justify-between items-center px-1">
                                <span className="font-bold text-brand-dark">Fresh Juice</span>
                                <span className="text-brand-primary font-black">₦1,200</span>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                            <Clock className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-dark">Super Fast</h3>
                        <p className="text-gray-500">Orders reach vendors instantly. No more waiting in long lines at the cafeteria.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-8 h-8 text-brand-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-dark">Secure Payments</h3>
                        <p className="text-gray-500">Every transaction is tracked and secured. Focus on the food, we handle the rest.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto">
                            <Utensils className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-dark">Variety</h3>
                        <p className="text-gray-500">From local delicacies to modern snacks, find everything your campus has to offer.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-brand-dark text-white">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                    <div className="flex items-center justify-center gap-2">
                        <Utensils className="w-8 h-8 text-brand-primary" />
                        <span className="font-black text-3xl tracking-tighter">Quick<span className="text-brand-primary">Bite</span></span>
                    </div>
                    <p className="text-gray-400">© 2026 QuickBite Campus Food Delivery. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
