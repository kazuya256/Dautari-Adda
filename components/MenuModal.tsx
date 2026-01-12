'use client';

import { motion, AnimatePresence } from 'framer-motion';

const MenuModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const categories = [
        {
            title: 'Small Plates & Street Food',
            items: [
                { name: 'Jhol Momo', text: 'Steamed dumplings drowned in spicy sesame broth.', price: 'Rs. 250' },
                { name: 'Samosa Chaat', text: 'Crushed samosas topped with yogurt, tamarind, and pomegranate.', price: 'Rs. 180' },
                { name: 'Chicken Choila', text: 'Spiced grilled chicken tossed with mustard oil and fenugreek.', price: 'Rs. 380' },
                { name: 'Pork Sekuwa', text: 'Traditional charcoal-grilled skewered meat.', price: 'Rs. 450' },
                { name: 'Sel Roti & Aloo', text: 'Sweet rice donuts served with spicy potato curry.', price: 'Rs. 200' },
            ]
        },
        {
            title: 'Mains & Bhojan',
            items: [
                { name: 'Thakali Set', text: 'Complete meal with rice, lentils, curry, greens, and pickles.', price: 'Rs. 550' },
                { name: 'Clay Pot Biryani', text: 'Aromatic basmati rice slow-cooked with saffron and chicken.', price: 'Rs. 600' },
                { name: 'Bhat Set with Masu', text: 'Village-style rice set with rich mutton or chicken curry.', price: 'Rs. 500' },
                { name: 'Homestyle Egg Curry', text: 'Boiled eggs simmered in a rich tomato and onion gravy.', price: 'Rs. 320' },
                { name: 'Chicken Thukpa', text: 'Hearty Himalayan noodle soup with fresh vegetables.', price: 'Rs. 300' },
            ]
        },
        {
            title: 'Sides & Breads',
            items: [
                { name: 'Millet Bread (Kodo)', text: 'Rustic local flatbread.', price: 'Rs. 100' },
                { name: 'Butter Naan', text: 'Soft clay-oven bread.', price: 'Rs. 80' },
                { name: 'Mustard Greens (Saag)', text: 'Fresh seasonal greens stir-fried.', price: 'Rs. 150' },
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#111] border border-white/10 w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#0d0d0d]/95 backdrop-blur-lg z-10 p-8 border-b border-white/5 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display text-white italic">Dautari Menu</h2>
                                <p className="text-xs tracking-[0.2em] text-[#e3984e] uppercase mt-2 font-bold">Authentic Flavors</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="group p-2 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white transition-colors">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 bg-[#111]">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="space-y-8">
                                    <h3 className="text-xl font-light text-[#e3984e] border-b border-white/10 pb-3 uppercase tracking-widest">{cat.title}</h3>
                                    <ul className="space-y-8">
                                        {cat.items.map((item, i) => (
                                            <li key={i} className="flex flex-col gap-2 group cursor-default">
                                                <div className="flex justify-between items-baseline border-b border-white/5 pb-2 border-dashed">
                                                    <span className="text-lg font-medium text-gray-200 group-hover:text-[#e3984e] transition-colors font-display tracking-wide">{item.name}</span>
                                                    <span className="text-sm font-bold text-[#e3984e]">{item.price}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-light leading-relaxed italic">{item.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 text-center bg-[#0d0d0d] mt-auto">
                            <p className="text-[10px] text-gray-600 font-bold tracking-[0.2em] uppercase">Dautari Adda - Taste of Kritipur</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuModal;
