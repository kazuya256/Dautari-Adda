'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MENU_ITEMS = {
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

const Hero = () => {
    const [bookingStep, setBookingStep] = useState<'idle' | 'form' | 'summary'>('idle');
    const [formData, setFormData] = useState({
        personName: '',
        phoneNumber: '',
        resDate: '',
        resTime: '',
        guests: '1',
        quickOrder: 'Jhol Momo'
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
    };

    const handleViewBill = () => {
        if (!formData.personName || !formData.phoneNumber || !formData.resDate || !formData.resTime) {
            showNotification('Please fill in all details (Name, Phone, Date, Time).', 'error');
            return;
        }
        setBookingStep('summary');
    };

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/book-food', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setBookingStep('idle');
                showNotification(`Booking Confirmed, ${formData.personName}! We await your arrival.`, 'success');
                setFormData({
                    personName: '',
                    phoneNumber: '',
                    resDate: '',
                    resTime: '',
                    guests: '1',
                    quickOrder: 'Jhol Momo'
                });
            } else {
                showNotification('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            showNotification('Error connecting to server. Please check your connection.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const unitPrice = MENU_ITEMS[formData.quickOrder as keyof typeof MENU_ITEMS] || 0;
    const guestCount = parseInt(formData.guests) || 1;
    const totalPrice = unitPrice * guestCount;

    return (
        <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={`fixed top-24 left-1/2 -translate-x-1/2 z-[150] px-8 py-4 rounded shadow-2xl backdrop-blur-md border border-white/10 ${notification.type === 'success' ? 'bg-green-900/90 text-white' : 'bg-red-900/90 text-white'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {notification.type === 'success' ? (
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            ) : (
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            )}
                            <span className="text-sm font-medium tracking-wide">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Booking Modal (Form or Summary) */}
            <AnimatePresence>
                {bookingStep !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            {bookingStep === 'form' ? (
                                /* --- STEP 1: DATA ENTRY FORM --- */
                                <div className="p-8 space-y-6">
                                    <div className="text-center border-b border-gray-100 pb-4">
                                        <h3 className="text-2xl font-serif italic text-gray-900">Your Reservation</h3>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Enter your details</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Name & Phone */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Name *</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light placeholder:text-gray-300"
                                                    value={formData.personName}
                                                    onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phone *</label>
                                                <input
                                                    type="tel"
                                                    placeholder="98..."
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light placeholder:text-gray-300"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Date *</label>
                                                <input
                                                    type="date"
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light"
                                                    value={formData.resDate}
                                                    onChange={(e) => setFormData({ ...formData, resDate: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Time *</label>
                                                <input
                                                    type="time"
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light"
                                                    value={formData.resTime}
                                                    onChange={(e) => setFormData({ ...formData, resTime: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Guests & Order */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Guests / Qty</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light"
                                                    value={formData.guests}
                                                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Quick Order</label>
                                                <select
                                                    className="border-b border-gray-200 py-2 focus:outline-none text-sm text-gray-800 font-light cursor-pointer"
                                                    value={formData.quickOrder}
                                                    onChange={(e) => setFormData({ ...formData, quickOrder: e.target.value })}
                                                >
                                                    {Object.keys(MENU_ITEMS).map((item) => (
                                                        <option key={item} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                                <p className="text-[10px] text-gray-400 mt-1">Rate: Rs. {unitPrice}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => setBookingStep('idle')}
                                            className="flex-1 py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleViewBill}
                                            className="flex-1 bg-[#e3984e] text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#d68a3f] transition-colors"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* --- STEP 2: BILL SUMMARY --- */
                                <>
                                    <div className="p-8 border-b border-gray-100 text-center bg-[#fafafa]">
                                        <h3 className="text-2xl font-serif italic text-gray-900">Bill Summary</h3>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{formData.resDate} at {formData.resTime}</p>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                                            <span className="text-gray-500 text-sm uppercase tracking-wide">Customer</span>
                                            <span className="text-gray-900 font-medium">{formData.personName}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-200">
                                            <span className="text-gray-500 text-sm uppercase tracking-wide">Contact</span>
                                            <span className="text-gray-900 font-medium">{formData.phoneNumber}</span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 font-medium">{formData.quickOrder}</span>
                                                <span className="text-xs text-gray-500">Rate: Rs. {unitPrice}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-gray-900 font-bold block">x{guestCount}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                            <span className="text-xl font-bold text-[#e3984e]">Rs. {totalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 flex gap-4">
                                        <button
                                            onClick={() => setBookingStep('form')}
                                            className="flex-1 py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleConfirmBooking}
                                            disabled={loading}
                                            className="flex-1 bg-[#e3984e] text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#d68a3f] transition-colors disabled:opacity-50"
                                        >
                                            {loading ? 'Confirming...' : 'Confirm Order'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Real High-Quality Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=100&w=1920"
                    alt="Dautari Adda Exterior"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="container-luxury relative z-10 text-center text-white space-y-6">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs tracking-[0.4em] uppercase font-medium"
                >
                    Signature Dining in Kathmandu
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-light italic"
                >
                    Dautari Adda
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl font-light max-w-2xl mx-auto tracking-wide"
                >
                    A sanctuary of refined taste and legendary hospitality.
                </motion.p>
            </div>

            {/* Main CTA Button */}
            <motion.div
                id="book-food"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
            >
                <button
                    onClick={() => setBookingStep('form')}
                    className="btn-hotel px-12 py-4 text-base md:text-lg shadow-xl hover:scale-105 transition-transform duration-300"
                >
                    Book Your Food
                </button>
            </motion.div>
        </section>
    );
};
export default Hero;
