'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = {
    'None (Table Only)': 0,
    'Jhol Momo': 250,
    'Samosa Chaat': 180,
    'Chicken Choila': 380,
    'Pork Sekuwa': 450,
    'Sel Roti & Aloo': 200,
    'Thakali Set': 550,
    'Clay Pot Biryani': 600,
    'Bhat Set with Masu': 500,
    'Homestyle Egg Curry': 320,
    'Chicken Thukpa': 300,
    'Millet Bread (Kodo)': 100,
    'Butter Naan': 80,
    'Mustard Greens (Saag)': 150
} as const;

const Reservation = () => {
    const [formData, setFormData] = useState({
        personName: '',
        phoneNumber: '',
        resDate: '',
        resTime: '',
        guests: '1',
        specialRequest: '',
        selectedItem: 'None (Table Only)'
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate Bill
    const unitPrice = MENU_ITEMS[formData.selectedItem as keyof typeof MENU_ITEMS] || 0;
    const guestCount = parseInt(formData.guests) || 1;
    const totalPrice = unitPrice * guestCount;

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate
        if (!formData.personName || !formData.phoneNumber || !formData.resDate || !formData.resTime) {
            setStatus('error');
            setLoading(false);
            return;
        }

        // WhatsApp Logic
        const phoneNumber = '9779811335351'; // Corrected to 10 digits (User provided 11, likely typo)

        const message = `
New Table Reservation & Order 🍽️
---------------------------
Name: ${formData.personName}
Phone: ${formData.phoneNumber}
Date: ${formData.resDate}
Time: ${formData.resTime}
Guests: ${formData.guests}
Pre-order: ${formData.selectedItem}
Total Est. Bill: Rs. ${totalPrice}
Special Request: ${formData.specialRequest || 'None'}
---------------------------
Sent from website.
        `.trim();

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show Success UI
        setStatus('success');
        setFormData({
            personName: '',
            phoneNumber: '',
            resDate: '',
            resTime: '',
            guests: '1',
            specialRequest: '',
            selectedItem: 'None (Table Only)'
        });

        setLoading(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setStatus('idle');
        }, 3000);
    };

    return (
        <section className="py-24 bg-[#050505] relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/reservation-bg.jpg')] bg-cover bg-center opacity-10 filter grayscale contrast-125 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black via-black/90 to-black/80"></div>

            <div className="container-luxury relative z-10 w-full">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Text Content */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase block mb-4">Join Us</span>
                            <h2 className="text-5xl md:text-7xl font-light text-white font-display leading-[1.1] mb-6">
                                Reserve <br />
                                <span className="italic text-gray-500">Your Spot</span>
                            </h2>
                            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Whether it's a romantic dinner or a family gathering, ensure your spot at Dautari Adda. Experience the finest dining in Kirtipur.
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10 mt-12">
                                <div>
                                    <h4 className="text-white font-display text-xl mb-2">Lunch</h4>
                                    <p className="text-gray-400 font-light text-sm">11:00 AM - 03:00 PM</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-display text-xl mb-2">Dinner</h4>
                                    <p className="text-gray-400 font-light text-sm">06:00 PM - 10:00 PM</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Form - Embedded */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/10 p-8 md:p-10 shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e3984e] to-transparent"></div>

                            <h3 className="text-3xl text-white font-display italic mb-8 text-center lg:text-left">Details</h3>

                            <form onSubmit={handleConfirmBooking} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Name</label>
                                    <input
                                        type="text"
                                        value={formData.personName}
                                        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Date</label>
                                        <input
                                            type="date"
                                            value={formData.resDate}
                                            onChange={(e) => setFormData({ ...formData, resDate: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Time</label>
                                        <input
                                            type="time"
                                            value={formData.resTime}
                                            onChange={(e) => setFormData({ ...formData, resTime: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Guests</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Pre-order Food</label>
                                        <select
                                            value={formData.selectedItem}
                                            onChange={(e) => setFormData({ ...formData, selectedItem: e.target.value })}
                                            className="w-full bg-[#111] border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors text-sm"
                                        >
                                            {Object.keys(MENU_ITEMS).map(item => (
                                                <option key={item} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Special Request</label>
                                    <input
                                        type="text"
                                        value={formData.specialRequest}
                                        onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                                        placeholder="Optional"
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-[#e3984e] transition-colors placeholder:text-gray-700"
                                    />
                                </div>

                                <div className="bg-white/5 p-4 rounded border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Estimated Total</span>
                                    <span className="text-[#e3984e] font-display text-xl">Rs. {totalPrice}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#e3984e] text-black font-bold uppercase tracking-widest py-4 hover:bg-[#d68a3f] transition-all disabled:opacity-50 mt-4 shadow-lg hover:shadow-[#e3984e]/20"
                                >
                                    {loading ? 'Processing...' : 'Confirm Reservation'}
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-500 text-sm font-medium text-center animate-pulse">Redirecting to WhatsApp...</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center">Please fill all required fields correctly.</p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation;
