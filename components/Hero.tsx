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
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                >
                    <span className="inline-block text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase font-medium bg-black/30 backdrop-blur-md px-6 py-3 rounded-none border-y border-[#e3984e]/30 text-[#e3984e] shadow-[0_0_20px_rgba(227,152,78,0.1)]">
                        ✦ Signature Dining in Kathmandu ✦
                    </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-7xl md:text-9xl lg:text-[10rem] font-light italic drop-shadow-2xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#a8a8a8]"
                    >
                        Dautari <span className="text-[#e3984e] font-normal not-italic tracking-tighter">Adda</span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-lg md:text-2xl font-light max-w-2xl mx-auto tracking-wide text-gray-200"
                >
                    A sanctuary of <span className="text-[#e3984e] italic">refined taste</span> and legendary hospitality.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pt-8"
                >
                    <a href="/reserve" className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium tracking-tighter text-white bg-transparent border border-white/30 rounded-full hover:border-[#e3984e] transition-colors duration-300">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e3984e] rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="relative text-sm uppercase tracking-[0.2em] group-hover:text-black transition-colors">Reserve Table</span>
                    </a>
                </motion.div>
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
