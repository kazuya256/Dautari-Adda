'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MenuModal from './MenuModal';

const Dining = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sections = [
        {
            title: 'Signature Momos & Samosas',
            subtitle: 'Traditional Street, Modern Treat',
            description: 'Rediscover Nepal’s beloved classics. Our Momos are handcrafted with delicate wrappers and juicy fillings, while our Samosas offer a crispy, golden crunch. Served with artisanal dips that bridge traditional spice with modern zest.',
            image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=1200',
            tag: 'NEPALI CLASSICS'
        },
        {
            title: 'Clay Pot Biryani & Egg Curry',
            subtitle: 'Aromatic · Hearty · Authentic',
            description: 'A celebration of rich flavors. Our aromatic Biryani is slow-cooked to capture the essence of saffron and spices, perfectly complemented by our velvety, homestyle Egg Curry—a dish that feels like home, reimagined.',
            image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1200',
            tag: 'ROYAL MAINS'
        }
    ];

    return (
        <section id="dining" className="section-spacing bg-[#fafafa]">
            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="container-luxury">
                <div className="text-center mb-20">
                    <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold mb-4 block">Our Flavors</span>
                    <h2 className="text-5xl md:text-6xl text-gray-900 mb-6">Traditional Meets Modern</h2>
                </div>

                <div className="space-y-32">
                    {sections.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}
                        >
                            <div className="w-full lg:w-1/2 relative h-[500px] shadow-2xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="text-xs tracking-[0.3em] font-bold text-gray-400 uppercase">{item.tag}</span>
                                <h3 className="text-5xl md:text-6xl italic">{item.title}</h3>
                                <p className="text-gray-500 font-medium tracking-wide">{item.subtitle}</p>
                                <p className="text-gray-600 font-light leading-relaxed text-lg max-w-lg">
                                    {item.description}
                                </p>
                                <div className="pt-4 flex gap-4">
                                    <button
                                        className="btn-hotel"
                                        onClick={() => setIsMenuOpen(true)}
                                    >
                                        View Menu
                                    </button>
                                    <button
                                        onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="btn-hotel-outline"
                                    >
                                        Reserve Table
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dining;
