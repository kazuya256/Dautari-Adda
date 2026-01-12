'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (

        <footer id="contact" className="bg-black text-white py-24 border-t border-white/5">
            <div className="container-custom px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-32">
                    {/* Brand */}
                    <div className="space-y-10">
                        <div>
                            <Image
                                src="/dautari-logo.png"
                                alt="Dautari Adda"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
                            Culinary precision meets timeless hospitality in the heart of Kritipur. A minimalist sanctuary for the discerning diner.
                        </p>
                    </div>

                    {/* Nav */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-10 text-white/30">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link href="#dining" className="text-sm font-light hover:text-white/50 transition-colors">Dining & Bar</Link></li>
                            <li><Link href="#about" className="text-sm font-light hover:text-white/50 transition-colors">The Story</Link></li>
                            <li><Link href="#gallery" className="text-sm font-light hover:text-white/50 transition-colors">Visual Archive</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-10 text-white/30">Connect</h4>
                        <ul className="space-y-6">
                            <li className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/30 uppercase">Address</span>
                                <span className="text-sm font-light">Kirtipur , Kathmandu, Nepal</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/30 uppercase">Phone</span>
                                <span className="text-sm font-light">+977 985-1430250</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/30 uppercase">Email</span>
                                <span className="text-sm font-light">dautariadda@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:row items-center justify-between pt-12 border-t border-white/5 text-[10px] tracking-[0.3em] font-light text-white/20 uppercase">
                    <p>© {new Date().getFullYear()} DAUTARI ADDA. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-10 mt-8 md:mt-0">
                        <span className="hover:text-white transition-colors cursor-pointer">INSTAGRAM</span>
                        <a href="https://www.facebook.com/profile.php?id=61578686395488" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">FACEBOOK</a>
                    </div>
                </div>
            </div>
        </footer>
    );

};

export default Footer;
