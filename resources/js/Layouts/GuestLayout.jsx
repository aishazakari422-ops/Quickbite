import { Link } from '@inertiajs/react';
import { Utensils } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-brand-surface pt-6 sm:justify-center sm:pt-0 selection:bg-brand-primary selection:text-white">
            <div className="mb-8">
                <Link href="/" className="flex flex-col items-center gap-2">
                    <div className="bg-brand-primary p-4 rounded-[20px] shadow-premium">
                        <Utensils className="h-10 w-10 text-white" />
                    </div>
                    <span className="font-black text-3xl tracking-tighter text-brand-dark">Quick<span className="text-brand-primary">Bite</span></span>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-10 py-12 bg-white shadow-premium rounded-[40px] border border-gray-100">
                {children}
            </div>
        </div>
    );
}
