import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Setup() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('vendor.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-brand-dark">
                    Set Up Your <span className="text-brand-primary">Shop</span>
                </h2>
            }
        >
            <Head title="Shop Setup" />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100">
                    <p className="text-gray-500 mb-8">
                        Welcome to QuickBite! Tell us a bit about your food stall so students can start ordering from you.
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Shop Name (e.g. Mama's Kitchen)" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Shop Description" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-xl shadow-sm"
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="What kind of food do you sell? (e.g. Traditional meals, Snacks, Drinks...)"
                                rows="4"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="btn-premium" disabled={processing}>
                                Create My Shop
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
