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
        const phoneNumber = '9779824998172'; // Corrected to 10 digits (User provided 11, likely typo)

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
        <section id="contact" className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/reservation-bg.jpg')] bg-cover bg-center opacity-20 filter grayscale contrast-125 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>

            <div className="container-luxury relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <span className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase block">Join Us Today</span>
                    <h2 className="text-5xl md:text-7xl font-light text-white font-display leading-[1.1]">
                        Experience <br />
                        <span className="italic text-gray-500">True Hospitality</span>
                    </h2>
                    <p className="text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                        Whether it's a romantic dinner or a family gathering, ensure your spot at Dautari Adda. We look forward to serving you.
                    </p>

                    <div className="pt-8">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#e3984e] text-white px-10 py-5 text-sm uppercase tracking-widest font-bold hover:bg-[#d68a3f] transition-all shadow-2xl hover:scale-105 active:scale-95"
                        >
                            Reserve Your Table
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t border-white/10 mt-16 max-w-4xl mx-auto">
                        <div>
                            <h4 className="text-white font-display text-xl mb-4">Open Hours</h4>
                            <p className="text-gray-400 font-light tracking-wide">Sun - Fri: 09:00 AM - 10:00 PM</p>
                            <p className="text-gray-400 font-light tracking-wide">Saturday: 10:00 AM - 11:00 PM</p>
                        </div>
                        <div>
                            <h4 className="text-white font-display text-xl mb-4">Contact</h4>
                            <p className="text-gray-400 font-light tracking-wide">+977-9800000000</p>
                            <p className="text-gray-400 font-light tracking-wide">info@dautariadda.com</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex justify-center items-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#111] border border-white/10 w-full max-w-lg p-8 md:p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="text-3xl text-white font-display italic">Reserve a Table</h3>
                                <p className="text-[#e3984e] text-xs uppercase tracking-widest mt-2 font-bold">Secure your experience</p>
                            </div>

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

                                {/* Food Pre-order */}
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

                                {/* Bill Summary */}
                                <div className="bg-white/5 p-4 rounded border border-white/10 flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Estimated Total</span>
                                    <span className="text-[#e3984e] font-display text-xl">Rs. {totalPrice}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#e3984e] text-white font-bold uppercase tracking-widest py-4 hover:bg-[#d68a3f] transition-all disabled:opacity-50 mt-4 shadow-lg"
                                >
                                    {loading ? 'Processing...' : 'Confirm & Reserve'}
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-500 text-sm font-medium text-center animate-pulse">Redirecting to WhatsApp...</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center">Please fill all required fields correctly.</p>
                                )}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Reservation;
