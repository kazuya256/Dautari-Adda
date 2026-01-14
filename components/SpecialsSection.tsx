
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Promotions {
    todays_special: { title: string; description: string; image_url: string; is_active: boolean };
    limited_offer: { title: string; description: string; offer_percent: string; is_active: boolean };
}

export default function SpecialsSection() {
    const [promotions, setPromotions] = useState<Promotions | null>(null);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const res = await fetch('/api/specials');
                const data = await res.json();
                if (data.success) {
                    setPromotions(data.promotions);
                }
            } catch (error) {

            }
        };
        fetchPromotions();
    }, []);

    if (!promotions) return null; // Loading state

    const isTodaysSpecialActive = promotions.todays_special?.is_active ?? false;
    const isLimitedOfferActive = promotions.limited_offer?.is_active ?? false;

    if (!isTodaysSpecialActive && !isLimitedOfferActive) return null; // Nothing to show

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e3984e]/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e3984e]/5 rounded-full blur-[100px]"></div>

            <div className="container-luxury z-10 relative">
                <div className="text-center mb-16">
                    <span className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase">Don't Miss Out</span>
                    <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] italic text-white mt-4">Current <span className="text-[#e3984e]">Promotions</span></h2>
                </div>

                <div className={`grid grid-cols-1 ${isTodaysSpecialActive && isLimitedOfferActive ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-8`}>

                    {/* Today's Special */}
                    {isTodaysSpecialActive && promotions.todays_special && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] overflow-hidden rounded-sm border border-white/5"
                        >
                            <div className="absolute inset-0 z-0">
                                {promotions.todays_special.image_url ? (
                                    <Image
                                        src={promotions.todays_special.image_url}
                                        alt={promotions.todays_special.title || 'Special'}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#111]"></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                                <span className="inline-block px-3 py-1 bg-[#e3984e] text-black text-[10px] font-bold tracking-widest uppercase mb-4 w-max">Today's Special</span>
                                <h3 className="text-3xl md:text-4xl text-white font-['Playfair_Display'] italic mb-4">{promotions.todays_special.title}</h3>
                                <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-sm">{promotions.todays_special.description}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Limited Time Offer */}
                    {isLimitedOfferActive && promotions.limited_offer && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] flex flex-col justify-center items-center text-center p-8 md:p-12 bg-[#0a0a0a] border border-[#e3984e]/20 rounded-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#e3984e]/10 to-transparent opacity-30"></div>

                            <div className="relative z-10">
                                <span className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Limited Time Offer</span>

                                <div className="relative inline-block mb-6">
                                    <h3 className="text-7xl md:text-9xl font-['Playfair_Display'] text-transparent bg-clip-text bg-gradient-to-b from-[#e3984e] to-[#a06830] opacity-90">
                                        {promotions.limited_offer.offer_percent}
                                    </h3>
                                </div>

                                <h4 className="text-xl md:text-2xl text-white font-light uppercase tracking-widest mb-4">{promotions.limited_offer.title}</h4>
                                <p className="text-gray-400 font-light text-sm md:text-base max-w-sm mx-auto mb-8">{promotions.limited_offer.description}</p>


                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}
