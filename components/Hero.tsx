'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Scene from './Scene';



const Hero = () => {
    return (
        <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Dautari Adda Exterior"
                    fill
                    priority
                    className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Particle Scene Layer */}
            <Scene />

            {/* Content */}
            <div className="container-luxury relative z-10 text-center text-white space-y-8 select-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.5em] uppercase font-medium bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full border border-white/20 whitespace-nowrap">
                        Signature Dining in Kathmandu
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-light italic drop-shadow-2xl"
                >
                    Dautari Adda
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-lg md:text-xl font-light max-w-2xl mx-auto tracking-wide text-white/90"
                >
                    A sanctuary of refined taste and legendary hospitality.
                </motion.p>
            </div>


            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </motion.div>
        </section>
    );
};
export default Hero;
