'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Assuming lucide-react is available or I can use an SVG

const MenuModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const categories = [
        {
            title: 'Small Plates & Street Food',
            items: [
                { name: 'Jhol Momo', price: 'Rs. 250', desc: 'Steamed dumplings drowned in spicy sesame broth.' },
                { name: 'Samosa Chaat', price: 'Rs. 180', desc: 'Crushed samosas topped with yogurt, tamarind, and pomegranate.' },
                { name: 'Chicken Choila', price: 'Rs. 380', desc: 'Spiced grilled chicken tossed with mustard oil and fenugreek.' },
                { name: 'Pork Sekuwa', price: 'Rs. 450', desc: 'Traditional charcoal-grilled skewered meat.' },
                { name: 'Sel Roti & Aloo', price: 'Rs. 200', desc: 'Sweet rice donuts served with spicy potato curry.' },
            ]
        },
        {
            title: 'Mains & Bhojan',
            items: [
                { name: 'Thakali Set', price: 'Rs. 550', desc: 'Complete meal with rice, lentils, curry, greens, and pickles.' },
                { name: 'Clay Pot Biryani', price: 'Rs. 600', desc: 'Aromatic basmati rice slow-cooked with saffron and chicken.' },
                { name: 'Bhat Set with Masu', price: 'Rs. 500', desc: 'Village-style rice set with rich mutton or chicken curry.' },
                { name: 'Homestyle Egg Curry', price: 'Rs. 320', desc: 'Boiled eggs simmered in a rich tomato and onion gravy.' },
                { name: 'Chicken Thukpa', price: 'Rs. 300', desc: 'Hearty Himalayan noodle soup with fresh vegetables.' },
            ]
        },
        {
            title: 'Sides & Breads',
            items: [
                { name: 'Millet Bread (Kodo)', price: 'Rs. 100', desc: 'Rustic local flatbread.' },
                { name: 'Butter Naan', price: 'Rs. 80', desc: 'Soft clay-oven bread.' },
                { name: 'Mustard Greens (Saag)', price: 'Rs. 150', desc: 'Fresh seasonal greens stir-fried.' },
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
                    className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#fcfbf9] w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#fcfbf9] z-10 p-8 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 italic">Dautari Menu</h2>
                                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mt-1">Authentic Flavors</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="space-y-8">
                                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3">{cat.title}</h3>
                                    <ul className="space-y-6">
                                        {cat.items.map((item, i) => (
                                            <li key={i} className="flex flex-col gap-1 group cursor-default">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <span className="text-lg font-medium text-gray-800 group-hover:text-[#e3984e] transition-colors">{item.name}</span>
                                                    <span className="text-sm font-bold text-gray-900 ml-4">{item.price}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-gray-100 text-center bg-gray-50 mt-auto">
                            <p className="text-xs text-gray-400 font-light tracking-wide uppercase">Dautari Adda - Taste of Kritipur</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuModal;
