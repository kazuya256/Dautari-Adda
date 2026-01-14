
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
}

export default function Gallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                if (data.success) {
                    setItems(data.gallery);
                }
            } catch (error) {
            }
        };
        fetchGallery();
    }, []);

    if (items.length === 0) return null;

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3984e]/5 rounded-full blur-[100px]"></div>

            <div className="container-luxury relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase">Visual Experience</span>
                    <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] italic text-white mt-4">Our <span className="text-[#e3984e]">Gallery</span></h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
                        A glimpse into the ambiance and culinary artistry that defines Dautari Adda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square overflow-hidden cursor-pointer border border-white/5"
                        >
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                                <div className="border-t border-b border-[#e3984e] py-2">
                                    <h3 className="text-xl text-white font-['Playfair_Display'] italic">{item.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
