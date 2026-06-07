import { Head, Link } from '@inertiajs/react';
import { 
    Utensils, Search, CheckCircle, 
    Star, ShoppingCart, MapPin, 
    Facebook, Twitter, Instagram, Smile, Zap
} from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-brand-primary selection:text-white pb-0">
            <Head title="Welcome to QuickBite" />
            
            {/* 1. NAVIGATION BAR */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-primary p-2 rounded-xl">
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-brand-dark">Quick<span className="text-brand-primary">Bite</span></span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 font-bold text-gray-600">
                        <Link href="/" className="text-brand-primary">Home</Link>
                        <a href="#how-it-works" className="hover:text-brand-primary transition-colors">How It Works</a>
                        <a href="#vendors" className="hover:text-brand-primary transition-colors">Vendors</a>
                        <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-premium py-2.5 px-6">Go to Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-bold text-brand-dark hover:text-brand-primary transition-colors hidden sm:block">Log in</Link>
                                <Link href={route('register')} className="btn-premium py-2.5 px-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all">Join Now</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* 2. HERO SECTION */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[600px]">
                    {/* Left Side: Content */}
                    <div className="space-y-8 z-10 pt-10 lg:pt-0">
                        <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20">
                            <Zap className="w-4 h-4 text-brand-primary fill-brand-primary" />
                            <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Fastest Delivery on Campus</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black text-brand-dark leading-[1.1] tracking-tight">
                            Your Favorite <span className="text-brand-primary relative">Campus Meals<svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent"/></svg></span> Delivered Fast.
                        </h1>
                        
                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
                            Order from trusted campus vendors, skip the queue, and get your favorite meals in minutes.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href={route('register')} className="w-full sm:w-auto btn-premium px-10 py-4 text-lg shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all text-center">
                                Order Food
                            </Link>
                            <Link href={route('vendor.setup')} className="w-full sm:w-auto px-10 py-4 text-lg font-bold text-brand-dark bg-white border-2 border-gray-200 rounded-2xl hover:border-brand-primary hover:text-brand-primary transition-all text-center">
                                Become a Vendor
                            </Link>
                        </div>

                        <div className="pt-8 border-t border-gray-200/60 flex flex-wrap gap-8 items-center">
                            <div>
                                <h4 className="text-2xl font-black text-brand-dark">500+</h4>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Students Served</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-brand-dark">50+</h4>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Campus Vendors</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider leading-tight">Fast<br/>Delivery</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Showcase */}
                    <div className="relative h-[600px] w-full hidden md:block">
                        {/* Main Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/90 backdrop-blur-xl p-4 rounded-[2rem] shadow-2xl z-30 animate-in slide-in-from-bottom duration-700 hover:scale-105 transition-transform cursor-pointer border border-white">
                            <div className="w-full h-64 bg-gray-100 rounded-3xl mb-4 overflow-hidden relative">
                                <img src="/images/burger.png" alt="Gourmet Burger" className="w-full h-full object-cover" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9
                                </div>
                            </div>
                            <div className="px-2 pb-2">
                                <h3 className="text-2xl font-black text-brand-dark mb-1">Gourmet Burger</h3>
                                <p className="text-sm text-gray-500 font-medium mb-4">Double beef, melted cheese, secret sauce.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-black text-brand-primary">₦3,800</span>
                                    <Link href={auth.user ? route('student.browse') : route('register')} className="w-12 h-12 bg-brand-dark text-white rounded-2xl flex items-center justify-center hover:bg-brand-primary transition-colors">
                                        <ShoppingCart className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Card (Jollof) */}
                        <div className="absolute top-20 left-4 w-64 bg-white/80 backdrop-blur-lg p-3 rounded-[2rem] shadow-xl z-20 -rotate-6 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 cursor-pointer border border-white">
                            <div className="w-full h-40 bg-gray-100 rounded-2xl mb-3 overflow-hidden">
                                <img src="/images/jollof.png" alt="Jollof Rice" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <h3 className="text-lg font-bold text-brand-dark">Party Jollof Rice</h3>
                                <span className="text-lg font-black text-brand-primary">₦2,500</span>
                            </div>
                        </div>

                        {/* Third Card (Juice) */}
                        <div className="absolute bottom-20 right-4 w-56 bg-white/80 backdrop-blur-lg p-3 rounded-[2rem] shadow-xl z-40 rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer border border-white">
                            <div className="w-full h-40 bg-gray-100 rounded-2xl mb-3 overflow-hidden">
                                <img src="/images/juice.png" alt="Fresh Juice" className="w-full h-full object-cover" />
                            </div>
                            <div className="px-2">
                                <h3 className="text-lg font-bold text-brand-dark">Fresh Orange Juice</h3>
                                <span className="text-lg font-black text-brand-primary">₦1,200</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SEARCH SECTION */}
            <section className="py-12 px-6 relative z-20 -mt-10">
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
                    <div className="text-center mb-6 pt-4">
                        <h2 className="text-2xl font-black text-brand-dark">What are you craving today?</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search meals, vendors, or categories..." 
                                className="w-full pl-16 pr-6 py-5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-brand-primary text-lg font-medium"
                            />
                        </div>
                        <button className="btn-premium py-5 px-10 text-lg rounded-2xl shadow-premium">
                            Find Food
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. POPULAR MEALS SECTION */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-brand-dark mb-4">Popular <span className="text-brand-primary">Meals</span></h2>
                            <p className="text-gray-500 font-medium">The most ordered dishes on campus right now.</p>
                        </div>
                        <Link href={route('student.browse')} className="hidden sm:flex items-center gap-2 font-bold text-brand-primary hover:text-brand-dark transition-colors">
                            View All <span className="text-xl">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Static Menu Items based on prompt */}
                        {[
                            { name: "Spicy Jollof Rice", price: "2,500", img: "/images/jollof.png", rating: "4.8" },
                            { name: "Classic Beef Burger", price: "3,500", img: "/images/burger.png", rating: "4.9" },
                            { name: "Chicken Shawarma", price: "2,000", img: "/images/shawarma.png", rating: "4.7" },
                            { name: "Special Fried Rice", price: "2,800", img: "/images/fried_rice.png", rating: "4.6" },
                            { name: "Pepperoni Pizza", price: "5,000", img: "/images/pizza.png", rating: "4.9" },
                            { name: "Tropical Smoothie", price: "1,500", img: "/images/smoothie.png", rating: "4.8" }
                        ].map((meal, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-premium transition-all duration-300 border border-gray-100 group">
                                <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative bg-gray-100">
                                    <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-xs shadow-sm">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {meal.rating}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h3 className="font-bold text-lg text-brand-dark mb-1">{meal.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="font-black text-xl text-brand-dark">₦{meal.price}</span>
                                        <Link href={auth.user ? route('student.browse') : route('register')} className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white p-3 rounded-xl transition-colors font-bold flex items-center gap-2 text-sm">
                                            <ShoppingCart className="w-4 h-4" /> Add
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. HOW IT WORKS */}
            <section id="how-it-works" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-brand-dark mb-4">How It <span className="text-brand-primary">Works</span></h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto mb-16">Getting your favorite food is easier than ever. Just follow these simple steps.</p>
                    
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gray-100 -translate-y-12 -z-10 rounded-full border-t border-dashed border-gray-300"></div>

                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm rotate-3 hover:rotate-0 transition-transform">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark mb-2">Browse Meals</h3>
                            <p className="text-gray-500 font-medium">Choose from trusted campus vendors and find exactly what you're craving.</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-brand-primary/10 text-brand-primary rounded-3xl flex items-center justify-center mb-6 shadow-sm -rotate-3 hover:rotate-0 transition-transform">
                                <ShoppingCart className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark mb-2">Place Order</h3>
                            <p className="text-gray-500 font-medium">Add items to your cart and pay securely online through our platform.</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm rotate-3 hover:rotate-0 transition-transform">
                                <Smile className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-dark mb-2">Enjoy Your Food</h3>
                            <p className="text-gray-500 font-medium">Pick up your fresh hot meal or get it delivered straight to your dorm.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TOP VENDORS */}
            <section id="vendors" className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-brand-dark mb-4">Top <span className="text-brand-primary">Vendors</span></h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto">Order from the most highly-rated food spots on campus.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Mama Put Special", rating: "4.9", orders: "2.1k", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200" },
                            { name: "Burger Bros", rating: "4.8", orders: "1.5k", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=200" },
                            { name: "Smoothie Hut", rating: "4.9", orders: "3.2k", img: "https://images.unsplash.com/photo-1622240506921-042a4e71c172?auto=format&fit=crop&q=80&w=200" },
                            { name: "Pizza Palace", rating: "4.7", orders: "900+", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200" }
                        ].map((vendor, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-premium transition-all duration-300 text-center">
                                <img src={vendor.img} alt={vendor.name} className="w-20 h-20 rounded-full mx-auto object-cover mb-4 ring-4 ring-gray-50" />
                                <h3 className="font-black text-lg text-brand-dark mb-2">{vendor.name}</h3>
                                <div className="flex items-center justify-center gap-4 text-sm font-bold text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {vendor.rating}
                                    </div>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <div>{vendor.orders} orders</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-brand-dark mb-4">What Students <span className="text-brand-primary">Say</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah K.", uni: "Computer Science", review: "QuickBite saved my life during finals week! I could order food while studying and just pick it up when it was ready. No more waiting in lines.", avatar: "https://i.pravatar.cc/150?img=1" },
                            { name: "Michael T.", uni: "Engineering", review: "The app is so easy to use and the food is always hot. I love that I can support campus vendors directly. Highly recommended!", avatar: "https://i.pravatar.cc/150?img=11" },
                            { name: "Jessica M.", uni: "Business", review: "Finally, a modern food delivery app for our campus. The interface is beautiful and the vendors are top-notch. 10/10.", avatar: "https://i.pravatar.cc/150?img=5" }
                        ].map((review, idx) => (
                            <div key={idx} className="bg-gray-50 p-8 rounded-[2rem] relative">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                                </div>
                                <p className="text-gray-600 font-medium mb-8 leading-relaxed">"{review.review}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                    <div>
                                        <h4 className="font-bold text-brand-dark">{review.name}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase">{review.uni}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FOOTER */}
            <footer className="bg-brand-dark text-white pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-brand-primary p-2 rounded-xl">
                                <Utensils className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-black text-3xl tracking-tighter text-white">Quick<span className="text-brand-primary">Bite</span></span>
                        </div>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            The premium food delivery and pre-ordering platform built specifically for university campuses.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors text-white">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors text-white">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-black text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 font-medium text-gray-400">
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Home</a></li>
                            <li><a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it Works</a></li>
                            <li><a href="#vendors" className="hover:text-brand-primary transition-colors">Top Vendors</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-black text-lg mb-6">For Vendors</h4>
                        <ul className="space-y-4 font-medium text-gray-400">
                            <li><Link href={route('vendor.setup')} className="hover:text-brand-primary transition-colors">Join as Vendor</Link></li>
                            <li><Link href={route('login')} className="hover:text-brand-primary transition-colors">Vendor Dashboard</Link></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-brand-primary transition-colors">Guidelines</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6">Contact</h4>
                        <ul className="space-y-4 font-medium text-gray-400">
                            <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-brand-primary" /> University Campus</li>
                            <li className="flex items-center gap-3"><Search className="w-5 h-5 text-brand-primary" /> support@quickbite.com</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-brand-primary" /> +234 123 456 7890</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 text-center text-gray-500 font-medium flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 QuickBite Campus Food Delivery. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
