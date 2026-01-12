'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-8'
            }`}>
            <div className="container-luxury flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link href="#dining">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>Dining</span>
                    </Link>
                    <Link href="#about">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>About</span>
                    </Link>
                </div>

                <Link href="#home">
                    <div className="text-center cursor-pointer">
                        <Image
                            src="/dautari-logo.png"
                            alt="Dautari Adda"
                            width={120}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                </Link>

                <div className="flex items-center gap-10">
                    <Link href="#gallery">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>Gallery</span>
                    </Link>
                    <Link href="#contact">
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>Contact</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
