'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Menu3D from './Menu3D';

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

    if (!isOpen) return null;

    return (
        <Menu3D categories={categories} onClose={onClose} />
    );
};

export default MenuModal;
