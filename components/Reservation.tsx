'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



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

    // Dynamic Menu State
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [selectedItemPrice, setSelectedItemPrice] = useState(0);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch('/api/menu');
                const data = await res.json();
                if (data.success) {
                    setMenuItems(data.items);
                }
            } catch (error) {
                console.error("Failed to load menu for reservation", error);
            }
        };
        fetchMenu();
    }, []);

    // Calculate Bill
    // Logic: Look up price of selectedItem from menuItems state
    useEffect(() => {
        if (formData.selectedItem === 'None (Table Only)') {
            setSelectedItemPrice(0);
        } else {
            const item = menuItems.find(i => i.name === formData.selectedItem);
            if (item) {
                // Parse price ("Rs. 250" -> 250)
                const priceString = item.price.replace(/[^0-9.]/g, '');
                setSelectedItemPrice(parseFloat(priceString) || 0);
            } else {
                setSelectedItemPrice(0);
            }
        }
    }, [formData.selectedItem, menuItems]);

    // guestCount is relevant if users order per person, but "Pre-order Food" 
    // usually implies a single dish for the table or per person. 
    // The previous logic multiplied unitPrice * guestCount. 
    // Assuming "Pre-order" means "One portion for each guest" logic is kept, 
    // OR if it means "One item total", we should probably clarify.
    // The previous code: const totalPrice = unitPrice * guestCount;
    // Let's keep this logic as it seems to be the intention (e.g. buffet or set meal logic).

    const guestCount = parseInt(formData.guests) || 1;
    // If Item is "None", price is 0.
    // If Item is selected, total = price * guests.
    // NOTE: If the user selects "Chicken Choila" (Rs 380) and 4 guests, total is 380 * 4 = 1520.
    // This assumes everyone gets the same item. 
    // For a simple pre-order dropdown, this is acceptable.
    const totalPrice = selectedItemPrice * guestCount;

    const handleConfirmBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate
        if (!formData.personName || !formData.phoneNumber || !formData.resDate || !formData.resTime) {
            setStatus('error');
            setLoading(false);
            return;
        }

        try {
            // 1. Save to Database
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.personName,
                    phone: formData.phoneNumber,
                    date: formData.resDate,
                    time: formData.resTime,
                    guests: formData.guests,
                    specialRequest: formData.specialRequest,
                    selectedItem: formData.selectedItem,
                    totalPrice: totalPrice
                }),
            });

            if (!res.ok) throw new Error('Failed to save reservation');

            // 2. WhatsApp Logic
            const phoneNumber = '9779811335351';

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

        } catch (error) {

            setStatus('error');
            alert('Could not save reservation. Please try again or contact us directly.');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setIsModalOpen(false);
                setStatus('idle');
            }, 3000);
        }
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
                                            <option value="None (Table Only)">None (Table Only)</option>
                                            {menuItems.map(item => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name} - {item.price}
                                                </option>
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
