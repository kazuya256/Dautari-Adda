'use client';

import Image from 'next/image';

const items = [
    { src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800', label: 'Jhol Momo' },
    { src: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800', label: 'Bhat Set with Masu' },
    { src: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800', label: 'Chicken Chowmein' },
    { src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800', label: 'Samosa' },
    { src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800', label: 'Roti with Chicken Gravy' },
    { src: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800', label: 'Millet Bread' },
];

const Gallery = () => {
    return (
        <section id="gallery" className="section-spacing bg-white">
            <div className="container-luxury">
                <div className="text-center mb-20">
                    <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold mb-4 block">Culinary Archive</span>
                    <h2 className="text-5xl md:text-6xl text-gray-900 mb-6">A Feast for the Senses</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <div key={i} className="relative h-[300px] md:h-[400px] overflow-hidden group cursor-pointer">
                            <Image
                                src={item.src}
                                alt={item.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="text-white text-lg tracking-[0.2em] uppercase font-light border border-white/30 px-6 py-2 bg-black/20 backdrop-blur-sm">
                                    {item.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
