'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotateParallax = useTransform(scrollYProgress, [0, 1], [2, -2]);

    return (
        <section id="about" ref={containerRef} className="py-20 bg-[#050505] overflow-hidden relative">
            {/* Architectural Grid Lines Background - Dark Mode */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
            </div>

            <div className="container-luxury relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Composition */}
                    <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                        <motion.div
                            style={{ y: yParallax, rotate: rotateParallax }}
                            className="absolute inset-4 lg:inset-10 z-10 bg-[#222] overflow-hidden shadow-2xl border border-white/10"
                        >
                            <Image
                                src="/images/about-img.jpg"
                                alt="Dautari Adda Ambience"
                                fill
                                className="object-cover scale-110 opacity-90"
                            />
                        </motion.div>
                        {/* Decorative Back Shape */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 border-[1px] border-[#e3984e]/40 transform -translate-x-4 -translate-y-4 z-0"
                        />
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="absolute bottom-10 -right-2 z-20 bg-[#1a1a1a] p-4 shadow-xl max-w-[150px] border border-white/10"
                        >
                            <p className="font-serif italic text-xl text-center leading-none text-white">
                                Est.<br />
                                <span className="text-[#e3984e] font-sans font-bold text-3xl not-italic">2012</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-8 pl-0 lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-4">
                                <span className="h-[1px] w-12 bg-[#e3984e]"></span>
                                <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold">Our Story</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light font-display text-white leading-[1.1]">
                                A Legacy of Flavor <br />
                                <span className="italic text-gray-500">in Kritipur</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl"
                        >
                            Founded over a decade ago, Dautari Adda has evolved from a humble gathering spot into a culinary landmark. We believe in the power of shared meals—taking pride in offering more than just food, but a curated journey into the authentic flavors and warm hospitality of Nepal.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
