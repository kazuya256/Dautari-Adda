'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="section-spacing bg-white overflow-hidden">
            <div className="container-luxury">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="w-full lg:w-1/2 relative h-[700px]">
                        <Image
                            src="https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?auto=format&fit=crop&q=80&w=1200"
                            alt="Dautari Adda Ambience"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[20px] border-[#fafafa] z-[-1]"></div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold block">Our Story</span>
                            <h2 className="text-5xl md:text-7xl font-light italic leading-tight text-gray-900">
                                A Legacy of Flavor <br /> in the Heart of Kritipur
                            </h2>
                        </div>

                        <p className="text-xl text-gray-600 font-light leading-relaxed">
                            Founded over a decade ago, Dautari Adda has become a culinary landmark. We take pride in offering more than just a meal; we offer a curated journey into the flavors of Kritipur.
                        </p>

                        <div className="grid grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                            <div className="space-y-2">
                                <span className="text-4xl font-light italic">Authentic</span>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Local Cuisine</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-4xl font-light italic">12y</span>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Service Heritage</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
