'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu3D from './Menu3D';

const MenuModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [categories, setCategories] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    const categoryOrder = [
        'Small Plates & Street Food',
        'Main & Bhojans',
        'Side & Breads',
        'Desserts',
        'Cold Drinks'
    ];

    React.useEffect(() => {
        if (!isOpen) return;

        const fetchMenu = async () => {
            try {
                const res = await fetch('/api/menu');
                const data = await res.json();
                if (data.success) {
                    const grouped: any = {};
                    categoryOrder.forEach(c => grouped[c] = []);

                    data.items.forEach((item: any) => {
                        if (!grouped[item.category]) grouped[item.category] = [];
                        grouped[item.category].push({
                            name: item.name,
                            text: item.description,
                            price: item.price
                        });
                    });

                    const formattedCategories = categoryOrder.map(cat => ({
                        title: cat,
                        items: grouped[cat] || []
                    })).filter(c => c.items.length > 0);

                    setCategories(formattedCategories);
                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [isOpen]);

    if (!isOpen) return null;

    if (loading) return null; // Or a loading spinner

    return (
        <Menu3D categories={categories} onClose={onClose} />
    );
};

export default MenuModal;
