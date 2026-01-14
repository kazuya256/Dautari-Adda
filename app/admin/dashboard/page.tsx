
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';

interface Reservation {
    id: number;
    name: string;
    phone: string;
    res_date: string;
    res_time: string;
    guests: number;
    special_request: string;
    selected_item: string;
    total_price: string;
    status: string;
    created_at: string;
}

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [promotions, setPromotions] = useState({
        todays_special: { title: '', description: '', image_url: '', is_active: false },
        limited_offer: { title: '', description: '', offer_percent: '', is_active: false }
    });
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [newGalleryItem, setNewGalleryItem] = useState({ title: '', image_url: '' });

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [newMenuItem, setNewMenuItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Small Plates & Street Food'
    });

    const router = useRouter();

    const categories = [
        'Small Plates & Street Food',
        'Main & Bhojans',
        'Side & Breads',
        'Desserts',
        'Cold Drinks'
    ];

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await fetch('/api/reservations');
                const data = await res.json();
                if (data.success) {
                    setReservations(data.reservations);
                }
            } catch (error) {

                toast.error('Failed to load reservations');
            }
        };

        const fetchPromotions = async () => {
            try {
                const res = await fetch('/api/specials');
                const data = await res.json();
                if (data.success) {
                    setPromotions({
                        todays_special: data.promotions.todays_special || { title: '', description: '', image_url: '', is_active: false },
                        limited_offer: data.promotions.limited_offer || { title: '', description: '', offer_percent: '', is_active: false }
                    });
                }
            } catch (error) {

            }
        };

        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                if (data.success) {
                    setGalleryItems(data.gallery);
                }
            } catch (error) {

            }
        }

        const fetchMenu = async () => {
            try {
                const res = await fetch('/api/menu');
                const data = await res.json();
                if (data.success) {
                    setMenuItems(data.items);
                }
            } catch (error) {

            }
        }

        fetchReservations();
        fetchPromotions();
        fetchGallery();
        fetchMenu();
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                // Update local state
                setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
                toast.success(`Reservation marked as ${newStatus}`);
            }
        } catch (error) {

            toast.error('Failed to update status');
        }
    };

    const confirmDelete = async (id: number) => {
        const loadingToast = toast.loading('Deleting reservation...');
        try {
            const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setReservations(prev => prev.filter(r => r.id !== id));
                toast.success('Reservation deleted successfully', { id: loadingToast });
            } else {
                toast.error('Failed to delete reservation', { id: loadingToast });
            }
        } catch (error) {

            toast.error('An error occurred while deleting', { id: loadingToast });
        }
    };

    const handleDelete = (id: number) => {
        toast('Are you sure you want to delete this reservation?', {
            action: {
                label: 'Delete',
                onClick: () => confirmDelete(id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { },
            },
            description: 'This action cannot be undone.',
            duration: 5000,
            style: {
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff'
            }
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadToast = toast.loading('Uploading image...');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                setPromotions(prev => ({
                    ...prev,
                    todays_special: { ...prev.todays_special, image_url: data.url }
                }));
                toast.success('Image uploaded successfully', { id: uploadToast });
            } else {
                toast.error('Upload failed: ' + data.message, { id: uploadToast });
            }
        } catch (error) {

            toast.error('Upload failed', { id: uploadToast });
        }
    };

    const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadToast = toast.loading('Uploading gallery image...');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                setNewGalleryItem(prev => ({ ...prev, image_url: data.url }));
                toast.success('Image uploaded', { id: uploadToast });
            } else {
                toast.error('Upload failed', { id: uploadToast });
            }
        } catch (error) {

            toast.error('Upload failed', { id: uploadToast });
        }
    }

    const handleAddGalleryItem = async () => {
        if (!newGalleryItem.title || !newGalleryItem.image_url) {
            toast.error('Please provide both title and image');
            return;
        }

        const loadingToast = toast.loading('Adding to gallery...');
        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGalleryItem)
            });
            const data = await res.json();
            if (data.success) {
                setGalleryItems(prev => [data.item, ...prev]);
                setNewGalleryItem({ title: '', image_url: '' });
                toast.success('Added to gallery', { id: loadingToast });
            } else {
                toast.error('Failed to add item', { id: loadingToast });
            }
        } catch (error) {

            toast.error('Failed to add item', { id: loadingToast });
        }
    }

    const executeDeleteGalleryItem = async (id: number) => {
        const loadingToast = toast.loading('Deleting image...');
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setGalleryItems(prev => prev.filter(item => item.id !== id));
                toast.success('Deleted successfully', { id: loadingToast });
            } else {
                toast.error('Failed to delete', { id: loadingToast });
            }
        } catch (error) {

            toast.error('Failed to delete', { id: loadingToast });
        }
    };

    const handleDeleteGalleryItem = (id: number) => {
        toast('Are you sure you want to delete this image?', {
            action: {
                label: 'Delete',
                onClick: () => executeDeleteGalleryItem(id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { },
            },
            description: 'This action cannot be undone.',
            duration: 5000,
            style: {
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff'
            }
        });
    };

    const handleAddMenuItem = async () => {
        if (!newMenuItem.name || !newMenuItem.category || !newMenuItem.price) {
            toast.error('Please fill in required fields');
            return;
        }

        const loadingToast = toast.loading('Adding menu item...');
        try {
            const res = await fetch('/api/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMenuItem)
            });
            const data = await res.json();
            if (data.success) {
                setMenuItems(prev => [...prev, data.item]);
                setNewMenuItem({ name: '', description: '', price: '', category: 'Small Plates & Street Food' });
                toast.success('Menu item added', { id: loadingToast });
            } else {
                toast.error('Failed to add item', { id: loadingToast });
            }
        } catch (error) {

            toast.error('Failed to add item', { id: loadingToast });
        }
    }

    const executeDeleteMenuItem = async (id: number) => {
        const loadingToast = toast.loading('Deleting menu item...');
        try {
            const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMenuItems(prev => prev.filter(item => item.id !== id));
                toast.success('Deleted successfully', { id: loadingToast });
            } else {
                toast.error('Failed to delete', { id: loadingToast });
            }
        } catch (error) {

            toast.error('Failed to delete', { id: loadingToast });
        }
    };

    const handleDeleteMenuItem = (id: number) => {
        toast('Are you sure you want to delete this item?', {
            action: {
                label: 'Delete',
                onClick: () => executeDeleteMenuItem(id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { },
            },
            description: 'This action cannot be undone.',
            duration: 5000,
            style: {
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff'
            }
        });
    };

    const handleSavePromotion = async (key: 'todays_special' | 'limited_offer', data: any) => {
        const loadingToast = toast.loading('Saving changes...');
        try {
            const res = await fetch('/api/specials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, ...data }),
            });
            if (res.ok) {
                toast.success('Saved successfully!', { id: loadingToast });
            } else {
                toast.error('Failed to save', { id: loadingToast });
            }
        } catch (error) {

            toast.error('Failed to save', { id: loadingToast });
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            toast.success('Logged out successfully');
        } catch (error) {

        }
    };

    // Stats Calculation
    const totalReservations = reservations.length;
    const today = new Date().toISOString().split('T')[0];
    const todaysCount = reservations.filter(r => r.res_date && new Date(r.res_date).toISOString().split('T')[0] === today).length;
    const totalRevenue = reservations
        .filter(r => r.status === 'Completed')
        .reduce((sum, r) => sum + (parseFloat(r.total_price) || 0), 0);

    const formatRevenue = (amount: number) => {
        if (amount >= 100000) return `Rs. ${(amount / 100000).toFixed(1)}L`;
        if (amount >= 1000) return `Rs. ${(amount / 1000).toFixed(1)}K`;
        return `Rs. ${amount}`;
    };

    const stats = [
        { label: 'Total Reservations', value: totalReservations.toString(), change: 'Total', color: 'from-blue-500 to-blue-600' },
        { label: 'Today\'s Activity', value: todaysCount.toString(), change: 'New Today', color: 'from-green-500 to-green-600' },
        { label: 'Total Revenue', value: formatRevenue(totalRevenue), change: 'Completed', color: 'from-[#e3984e] to-yellow-600' },
        { label: 'Pending Orders', value: reservations.filter(r => r.status === 'pending').length.toString(), change: 'Action Req.', color: 'from-purple-500 to-purple-600' },
    ];

    const recentOrders = [...reservations]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5)
        .map(res => ({
            id: `#RES-${res.id}`,
            customer: res.name,
            items: res.selected_item,
            total: `Rs. ${res.total_price}`,
            status: res.status
        }));

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex font-sans">
            <Toaster richColors position="top-right" theme="dark" />

            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0a] border-r border-[#e3984e]/10 hidden md:flex flex-col">
                <div className="p-8 pb-0">
                    <h1 className="text-2xl font-['Playfair_Display'] italic text-[#e3984e]">Dautari <span className="text-white">Adda</span></h1>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-1">Management Console</p>
                </div>

                <nav className="flex-1 mt-12 px-4 space-y-2">
                    {['overview', 'reservations', 'specials', 'gallery', 'menu'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 rounded-sm text-xs uppercase tracking-widest transition-all ${activeTab === item
                                ? 'bg-[#e3984e]/10 text-[#e3984e] border-l-2 border-[#e3984e]'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 w-full text-left"
                    >
                        <span>⏻</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 border-b border-[#e3984e]/10 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 md:hidden">☰</span>
                        <h2 className="text-xl font-light capitalize">{activeTab}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-[#e3984e]/10 border border-[#e3984e]/50 flex items-center justify-center hover:bg-[#e3984e]/20 transition-colors cursor-pointer group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e3984e] group-hover:scale-110 transition-transform">
                                <rect width="18" height="10" x="3" y="11" rx="2" />
                                <circle cx="12" cy="5" r="2" />
                                <path d="M12 7v4" />
                                <line x1="8" y1="16" x2="8" y2="16" />
                                <line x1="16" y1="16" x2="16" y2="16" />
                            </svg>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, i) => (
                                    <motion.div key={i} className="bg-[#151515] p-6 border border-white/5 relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl`}></div>
                                        <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">{stat.label}</h3>
                                        <div className="flex items-end justify-between">
                                            <span className="text-3xl font-['Playfair_Display'] text-white">{stat.value}</span>
                                            <span className="text-xs text-[#e3984e] bg-[#e3984e]/10 px-2 py-1 rounded">{stat.change}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-[#151515] border border-white/5 p-6">
                                <h3 className="text-lg font-light text-[#e3984e] mb-6">Recent Reservations</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-400">
                                        <thead className="text-[10px] uppercase tracking-wider text-gray-600 border-b border-white/5">
                                            <tr><th>Order ID</th><th>Customer</th><th>Items</th><th className="text-right">Total</th><th className="text-right">Status</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {recentOrders.map((order, i) => (
                                                <tr key={i}><td className="py-4 text-[#e3984e]">{order.id}</td><td>{order.customer}</td><td>{order.items}</td><td className="text-right">{order.total}</td><td className="text-right">{order.status}</td></tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Reservations Tab */}
                    {activeTab === 'reservations' && (
                        <div className="bg-[#151515] border border-white/5 p-6 animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-light text-[#e3984e]">All Reservations</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="text-[10px] uppercase tracking-wider text-gray-600 border-b border-white/5">
                                        <tr>
                                            <th className="pb-3 font-medium">Guest Name</th>
                                            <th className="pb-3 font-medium">Date & Time</th>
                                            <th className="pb-3 font-medium">Guests</th>
                                            <th className="pb-3 font-medium">Pre-Order</th>
                                            <th className="pb-3 font-medium text-right">Total Est.</th>
                                            <th className="pb-3 font-medium text-right">Status</th>
                                            <th className="pb-3 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {reservations.map((res) => (
                                            <tr key={res.id} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-4 text-white">
                                                    <div>{res.name}</div>
                                                    <div className="text-[10px] text-gray-600">{res.phone}</div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="text-white">{new Date(res.res_date).toLocaleDateString()}</div>
                                                    <div className="text-[10px] text-gray-600">{res.res_time}</div>
                                                </td>
                                                <td className="py-4">{res.guests}</td>
                                                <td className="py-4 truncate max-w-[150px] text-xs" title={res.selected_item}>
                                                    {res.selected_item}
                                                    {res.special_request && <span className="block text-[9px] text-blue-400 italic">Req: {res.special_request}</span>}
                                                </td>
                                                <td className="py-4 text-right">Rs. {res.total_price}</td>
                                                <td className="py-4 text-right">
                                                    <span className={`text-[10px] uppercase px-2 py-1 rounded-sm ${res.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}> {res.status} </span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {res.status !== 'Completed' && (
                                                            <button onClick={() => updateStatus(res.id, 'Completed')} className="text-[10px] uppercase font-bold text-black bg-[#e3984e] hover:bg-white px-3 py-1.5 rounded transition-all shadow-sm active:scale-95 whitespace-nowrap">✓ Complete</button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(res.id)}
                                                            className="text-[10px] uppercase font-bold text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-all shadow-sm active:scale-95 whitespace-nowrap"
                                                        >
                                                            ✕ Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {reservations.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="text-center py-8 text-gray-600">No reservations found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Specials Tab */}
                    {activeTab === 'specials' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Today's Special Card */}
                            <div className="bg-[#151515] border border-white/5 p-6 space-y-6">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-display text-[#e3984e]">Today's Special</h3>
                                    <label className="flex items-center gap-2 text-xs uppercase cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={promotions.todays_special.is_active}
                                            onChange={(e) => setPromotions({ ...promotions, todays_special: { ...promotions.todays_special, is_active: e.target.checked } })}
                                            className="accent-[#e3984e]"
                                        /> Active
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Dish Name</label>
                                        <input
                                            value={promotions.todays_special.title}
                                            onChange={(e) => setPromotions({ ...promotions, todays_special: { ...promotions.todays_special, title: e.target.value } })}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                            placeholder="e.g. Traditional Thakali Set"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Dish Image</label>
                                        <div className="flex gap-4 items-center">
                                            {promotions.todays_special.image_url && (
                                                <div className="w-16 h-16 relative border border-white/10">
                                                    <img src={promotions.todays_special.image_url} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:uppercase file:font-bold file:bg-[#e3984e] file:text-black hover:file:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Description</label>
                                        <textarea
                                            value={promotions.todays_special.description}
                                            onChange={(e) => setPromotions({ ...promotions, todays_special: { ...promotions.todays_special, description: e.target.value } })}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none h-24"
                                            placeholder="Authentic taste..."
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSavePromotion('todays_special', promotions.todays_special)}
                                        className="w-full bg-[#111] border border-[#e3984e] text-[#e3984e] py-3 hover:bg-[#e3984e] hover:text-black transition-colors uppercase text-xs tracking-widest font-bold"
                                    >
                                        Update Special
                                    </button>
                                </div>
                            </div>

                            {/* Limited Time Offer Card */}
                            <div className="bg-[#151515] border border-white/5 p-6 space-y-6">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-display text-red-500">Limited Time Offer</h3>
                                    <label className="flex items-center gap-2 text-xs uppercase cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={promotions.limited_offer.is_active}
                                            onChange={(e) => setPromotions({ ...promotions, limited_offer: { ...promotions.limited_offer, is_active: e.target.checked } })}
                                            className="accent-red-500"
                                        /> Active
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-red-500 text-xs uppercase tracking-widest mb-1">Offer Title</label>
                                        <input
                                            value={promotions.limited_offer.title}
                                            onChange={(e) => setPromotions({ ...promotions, limited_offer: { ...promotions.limited_offer, title: e.target.value } })}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-red-500 outline-none"
                                            placeholder="e.g. Student Discount"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-red-500 text-xs uppercase tracking-widest mb-1">Discount % / Value</label>
                                        <input
                                            value={promotions.limited_offer.offer_percent}
                                            onChange={(e) => setPromotions({ ...promotions, limited_offer: { ...promotions.limited_offer, offer_percent: e.target.value } })}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-red-500 outline-none font-bold"
                                            placeholder="15% OFF"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-red-500 text-xs uppercase tracking-widest mb-1">Description</label>
                                        <textarea
                                            value={promotions.limited_offer.description}
                                            onChange={(e) => setPromotions({ ...promotions, limited_offer: { ...promotions.limited_offer, description: e.target.value } })}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-red-500 outline-none h-24"
                                            placeholder="Valid on weekends only..."
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSavePromotion('limited_offer', promotions.limited_offer)}
                                        className="w-full bg-[#111] border border-red-500 text-red-500 py-3 hover:bg-red-500 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold"
                                    >
                                        Update Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-8">
                            <div className="bg-[#151515] border border-white/5 p-6">
                                <h3 className="text-xl font-display text-[#e3984e] mb-6">Add New Image</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Food Name</label>
                                        <input
                                            value={newGalleryItem.title}
                                            onChange={(e) => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                            placeholder="e.g. Spicy Chicken Wings"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Image</label>
                                        <div className="flex gap-4 items-center">
                                            {newGalleryItem.image_url && (
                                                <div className="w-10 h-10 border border-white/10 relative">
                                                    <img src={newGalleryItem.image_url} alt="Pre" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleGalleryImageUpload}
                                                className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:uppercase file:font-bold file:bg-[#e3984e] file:text-black hover:file:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddGalleryItem}
                                        className="w-full bg-[#e3984e] text-black py-2 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors h-[42px]"
                                    >
                                        Add to Gallery
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {galleryItems.map((item) => (
                                    <div key={item.id} className="group relative aspect-square bg-[#151515] border border-white/5 overflow-hidden">
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center">
                                            <h4 className="text-white font-display italic mb-2">{item.title}</h4>
                                            <button
                                                onClick={() => handleDeleteGalleryItem(item.id)}
                                                className="text-red-500 text-xs uppercase font-bold hover:text-white transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                    {/* Menu Tab */}
                    {activeTab === 'menu' && (
                        <div className="space-y-8">
                            {/* Add Menu Item */}
                            <div className="bg-[#151515] border border-white/5 p-6">
                                <h3 className="text-xl font-display text-[#e3984e] mb-6">Add Menu Item</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Item Name</label>
                                        <input
                                            value={newMenuItem.name}
                                            onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                            placeholder="Item Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Price</label>
                                        <input
                                            value={newMenuItem.price}
                                            onChange={(e) => setNewMenuItem(prev => ({ ...prev, price: e.target.value }))}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                            placeholder="e.g. Rs. 250"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Category</label>
                                        <select
                                            value={newMenuItem.category}
                                            onChange={(e) => setNewMenuItem(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[#e3984e] text-xs uppercase tracking-widest mb-1">Description (Max 7 words rec.)</label>
                                        <input
                                            value={newMenuItem.description}
                                            onChange={(e) => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full bg-black/50 border border-white/10 px-4 py-2 text-white focus:border-[#e3984e] outline-none"
                                            placeholder="Short delicious description..."
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddMenuItem}
                                    className="mt-6 w-full md:w-auto bg-[#e3984e] text-black px-8 py-2 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors"
                                >
                                    Add Item
                                </button>
                            </div>

                            {/* Menu List */}
                            <div className="bg-[#151515] border border-white/5 p-6">
                                <h3 className="text-xl font-display text-[#e3984e] mb-6">Current Menu</h3>
                                <div className="space-y-8">
                                    {categories.map(cat => {
                                        const items = menuItems.filter(item => item.category === cat);
                                        if (items.length === 0) return null;
                                        return (
                                            <div key={cat}>
                                                <h4 className="text-white border-b border-white/10 pb-2 mb-4 uppercase tracking-widest text-xs">{cat}</h4>
                                                <div className="space-y-2">
                                                    {items.map(item => (
                                                        <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded hover:bg-white/10 transition-colors group">
                                                            <div>
                                                                <h5 className="font-bold text-[#e3984e]">{item.name}</h5>
                                                                <p className="text-xs text-gray-400">{item.description}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="text-sm font-bold">{item.price}</span>
                                                                <button
                                                                    onClick={() => handleDeleteMenuItem(item.id)}
                                                                    className="text-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main >
        </div >
    );
}
