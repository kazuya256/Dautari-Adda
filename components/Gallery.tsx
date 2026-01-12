'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const items = [
    { src: '/images/gallery/choila.jpg', label: 'Spicy Choila', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/momo.jpg', label: 'Jhol Momo', span: 'col-span-1 row-span-2' },
    { src: '/images/gallery/samosa.jpg', label: 'Samosa', span: 'col-span-2 row-span-1' },
    { src: '/images/gallery/curry.jpg', label: 'Chicken Curry', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/selroti.jpg', label: 'Sel Roti', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/thakaliset.jpg', label: 'Thakali Set', span: 'col-span-2 row-span-2' },
    { src: '/images/gallery/thukpa.jpg', label: 'Chicken Thukpa', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/sekuwa.jpg', label: 'Pork Sekuwa', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/friedrice.jpg', label: 'Fried Rice', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery/kheer.jpg', label: 'Kheer Dessert', span: 'col-span-1 row-span-1' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Gallery = () => {
    return (
        <section id="gallery" className="section-spacing bg-[#050505] relative">
            <div className="absolute left-10 top-20 w-px h-32 bg-[#333] lg:block hidden"></div>
            {/* Dark textured gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-80 pointer-events-none" />

            <div className="container-luxury relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs uppercase tracking-[0.4em] text-[#e3984e] font-bold mb-4 block">Culinary Archive</span>
                        <h2 className="text-5xl md:text-7xl font-light text-white mb-6 font-display">A Feast for the <span className="italic text-[#888]">Senses</span></h2>
                    </motion.div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]"
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariant}
                            className={`relative overflow-hidden group cursor-pointer ${item.span || 'col-span-1 row-span-1'}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.label}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            {/* Sophisticated Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4">
                                <div className="border border-[#e3984e]/30 p-1 w-full h-full flex items-center justify-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <div className="text-center">
                                        <span className="text-[#e3984e] text-xs font-bold tracking-widest uppercase block mb-2 transform bg-black/80 px-2 py-1">Signature Dish</span>
                                        <span className="text-white text-xl md:text-2xl font-serif italic">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
