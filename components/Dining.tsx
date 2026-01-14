'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MenuModal from './MenuModal';

import Marquee from './Marquee';

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
        <section id="dining" className="section-spacing bg-[#111] relative overflow-hidden">

            {/* Announcement Marquee - Eye catching */}
            <div className="absolute top-20 left-0 right-0 z-40 opacity-80 hover:opacity-100 transition-opacity">
                <Marquee />
            </div>

            {/* Background Texture similar to About */}
            <div className="absolute top-0 right-0 p-20 opacity-[0.05] pointer-events-none invert">
                <svg width="400" height="400" viewBox="0 0 100 100" className="animate-[spin_60s_linear_infinite]">
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
            </div>

            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="container-luxury">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs uppercase tracking-[0.4em] text-[#e3984e] font-bold mb-4 block">Our Flavors</span>
                        <h2 className="text-5xl md:text-7xl font-light text-white mb-6 font-display">
                            Traditional <span className="italic text-gray-500">&</span> Modern
                        </h2>
                    </motion.div>
                </div>

                {/* Offer & Today's Special */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {/* Offer */}<motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-[#1a1a1a] p-10 border border-[#e3984e]/20 relative overflow-hidden group hover:border-[#e3984e] transition-colors duration-500"
                    >
                        {/* Animated Glow Ring */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#e3984e]/10 blur-3xl animate-pulse"></div>

                        <div className="absolute top-0 right-0 p-4 bg-[#e3984e] text-black font-bold uppercase text-xs tracking-widest z-10 shadow-[0_0_20px_rgba(227,152,78,0.4)]">
                            Limited Time
                        </div>
                        <h3 className="text-3xl font-display text-white mb-2 relative z-10">Weekend Feast Offer</h3>
                        <p className="text-[#e3984e] text-lg mb-4 font-medium relative z-10">Get <span className="text-4xl font-bold">20% OFF</span> on Family Platters</p>
                        <p className="text-gray-400 font-light mb-8 relative z-10 leading-relaxed">Bring your loved ones and enjoy a grand feast with our exclusive weekend discount. Valid Sat-Sun.</p>
                        <button className="relative z-10 px-8 py-3 bg-transparent border border-[#e3984e] text-[#e3984e] hover:bg-[#e3984e] hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                            Claim Offer
                        </button>
                    </motion.div>

                    {/* Today's Special */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative h-[400px] overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000"
                            alt="Today's Special"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-10">
                            <span className="text-[#e3984e] text-xs uppercase tracking-[0.3em] mb-2">Today's Special</span>
                            <h3 className="text-3xl font-display text-white mb-2">Spicy Chicken Thukpa</h3>
                            <p className="text-gray-300 font-light text-sm line-clamp-2">A warming bowl of handmade noodles in a rich, spicy broth topped with tender chicken and fresh herbs.</p>
                        </div>
                    </motion.div>
                </div>


                <div className="space-y-40">
                    {sections.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}
                        >
                            {/* Image Card */}
                            <div className="w-full lg:w-1/2 group relative">
                                <div className="absolute inset-x-8 -bottom-8 h-full bg-[#e3984e]/10 opacity-20 transition-transform duration-500 group-hover:translate-y-4 z-0"></div>
                                <div className="relative h-[600px] w-full overflow-hidden shadow-2xl border-2 border-white/5">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className={`h-[1px] w-8 ${index % 2 !== 0 ? 'bg-gray-700' : 'bg-[#e3984e]'}`}></span>
                                        <span className="text-xs tracking-[0.3em] font-bold text-gray-500 uppercase">{item.tag}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-light italic leading-tight text-white">{item.title}</h3>
                                    <p className="text-[#e3984e] font-medium tracking-widest text-sm uppercase">{item.subtitle}</p>
                                </div>

                                <p className="text-gray-400 font-light leading-relaxed text-lg max-w-lg">
                                    {item.description}
                                </p>

                                <div className="pt-8 flex gap-6">
                                    <button
                                        className="btn-hotel shadow-lg hover:shadow-xl text-white"
                                        onClick={() => setIsMenuOpen(true)}
                                    >
                                        View Menu
                                    </button>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dining;
