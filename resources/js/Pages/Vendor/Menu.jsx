import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

export default function Menu({ vendor, categories }) {
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editName, setEditName] = useState('');

    const categoryForm = useForm({
        name: '',
    });

    const itemForm = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        preparation_time: '',
        image: null,
    });

    const submitCategory = (e) => {
        e.preventDefault();
        categoryForm.post(route('vendor.category.store'), {
            onSuccess: () => categoryForm.reset(),
        });
    };

    const submitItem = (e) => {
        e.preventDefault();
        itemForm.post(route('vendor.item.store'), {
            onSuccess: () => {
                itemForm.reset();
                setActiveCategoryId(null);
            },
        });
    };

    const startEditing = (category) => {
        setEditingCategoryId(category.id);
        setEditName(category.name);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        router.patch(route('vendor.category.update', editingCategoryId), {
            name: editName,
        }, {
            onSuccess: () => setEditingCategoryId(null),
        });
    };

    const deleteCategory = (id) => {
        if (confirm('Are you sure you want to delete this category and all its items?')) {
            router.delete(route('vendor.category.destroy', id));
        }
    };

    const deleteItem = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(route('vendor.item.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-brand-dark">
                        Manage <span className="text-brand-primary">Menu</span>
                    </h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full italic">
                        {vendor.name}
                    </span>
                </div>
            }
        >
            <Head title="Menu Management" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar: Categories */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-brand-primary" /> Add Category
                        </h3>
                        <form onSubmit={submitCategory} className="space-y-4">
                            <TextInput
                                placeholder="e.g. Breakfast, Mains..."
                                value={categoryForm.data.name}
                                onChange={(e) => categoryForm.setData('name', e.target.value)}
                                className="w-full"
                                required
                            />
                            <PrimaryButton className="w-full justify-center btn-premium" disabled={categoryForm.processing}>
                                Create Category
                            </PrimaryButton>
                        </form>
                    </div>

                    <div className="bg-white overflow-hidden rounded-3xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-50">
                            <h3 className="font-bold text-brand-dark">Your Categories</h3>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {categories.length === 0 && (
                                <p className="p-6 text-sm text-gray-400 italic text-center">No categories yet.</p>
                            )}
                            {categories.map((category) => (
                                <div key={category.id} className="p-4 hover:bg-brand-surface transition-colors flex justify-between items-center group">
                                    {editingCategoryId === category.id ? (
                                        <form onSubmit={submitEdit} className="flex gap-2 w-full">
                                            <TextInput 
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                className="w-full text-sm"
                                                autoFocus
                                            />
                                            <button type="submit" className="text-brand-primary font-bold text-xs uppercase">Save</button>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-700">{category.name}</span>
                                                <span className="text-[10px] text-gray-400">{category.items.length} items</span>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditing(category)} className="text-gray-400 hover:text-brand-primary">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteCategory(category.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Area: Menu Items */}
                <div className="lg:col-span-2 space-y-8">
                    {categories.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <div className="bg-brand-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <UtensilsCrossed className="w-10 h-10 text-brand-primary/30" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Your menu is empty</h3>
                            <p className="text-gray-500">Start by creating a category on the left, then add your delicious food items!</p>
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 bg-brand-surface border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-xl font-extrabold text-brand-dark uppercase tracking-wide">
                                        {category.name}
                                    </h3>
                                    <button 
                                        onClick={() => {
                                            setActiveCategoryId(activeCategoryId === category.id ? null : category.id);
                                            itemForm.setData('category_id', category.id);
                                        }}
                                        className="flex items-center gap-1 text-sm font-bold text-brand-primary hover:underline"
                                    >
                                        <Plus className="w-4 h-4" /> Add Item
                                    </button>
                                </div>

                                {/* Inline Add Item Form */}
                                {activeCategoryId === category.id && (
                                    <div className="p-6 bg-brand-primary/5 border-b border-brand-primary/10">
                                        <form onSubmit={submitItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-1">
                                                <InputLabel value="Item Name" />
                                                <TextInput 
                                                    className="w-full mt-1" 
                                                    value={itemForm.data.name}
                                                    onChange={e => itemForm.setData('name', e.target.value)}
                                                    required 
                                                />
                                            </div>
                                            <div className="md:col-span-1">
                                                <InputLabel value="Price (₦)" />
                                                <TextInput 
                                                    type="number"
                                                    step="0.01"
                                                    className="w-full mt-1" 
                                                    value={itemForm.data.price}
                                                    onChange={e => itemForm.setData('price', e.target.value)}
                                                    required 
                                                />
                                            </div>
                                            <div className="md:col-span-1">
                                                <InputLabel value="Prep Time (Minutes)" />
                                                <TextInput 
                                                    type="number"
                                                    className="w-full mt-1" 
                                                    value={itemForm.data.preparation_time}
                                                    onChange={e => itemForm.setData('preparation_time', e.target.value)}
                                                    placeholder="e.g. 15"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <InputLabel value="Image (Optional)" />
                                                <input 
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => itemForm.setData('image', e.target.files[0])}
                                                    className="w-full mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <InputLabel value="Description (Optional)" />
                                                <textarea 
                                                    className="w-full mt-1 border-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-xl shadow-sm"
                                                    rows="2"
                                                    value={itemForm.data.description}
                                                    onChange={e => itemForm.setData('description', e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2 flex justify-end gap-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => setActiveCategoryId(null)}
                                                    className="px-4 py-2 text-gray-500 font-bold"
                                                >
                                                    Cancel
                                                </button>
                                                <PrimaryButton className="btn-premium" disabled={itemForm.processing}>
                                                    Add Item
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="divide-y divide-gray-50">
                                    {category.items.length === 0 && !activeCategoryId && (
                                        <p className="p-12 text-center text-gray-400 italic">No items in this category yet.</p>
                                    )}
                                    {category.items.map((item) => (
                                        <div key={item.id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                            <div className="flex gap-4 items-center">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                                                        <UtensilsCrossed className="w-6 h-6 text-gray-300" />
                                                    </div>
                                                )}
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-lg text-brand-dark">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                    {item.preparation_time && (
                                                        <span className="inline-block mt-1 text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md">
                                                            ⏱ {item.preparation_time} mins prep
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-black text-brand-primary">₦{item.price}</p>
                                                <div className="flex gap-2 mt-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="text-gray-400 hover:text-brand-secondary"><Edit2 className="w-4 h-4" /></button>
                                                    <button 
                                                        onClick={() => deleteItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
