'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // Parallax/Fade effect for logo could be added here if desired

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkVariants = {
        hover: {
            y: -2,
            transition: { duration: 0.3 }
        }
    };

    const underlineVariants = {
        hidden: { width: 0 },
        hover: {
            width: '100%',
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
        }
    };

    const NavLink = ({ href, text }: { href: string; text: string }) => (
        <Link href={href}>
            <motion.div
                className="relative cursor-pointer group"
                whileHover="hover"
                initial="hidden"
            >
                <motion.span
                    variants={linkVariants}
                    className={`text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-200' : 'text-white'}`}
                >
                    {text}
                </motion.span>
                <motion.span
                    variants={underlineVariants}
                    className={`absolute -bottom-1 left-0 h-[1px] bg-[#e3984e]`}
                />
            </motion.div>
        </Link>
    );

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                ? 'bg-black/90 backdrop-blur-md shadow-lg py-4 border-b border-white/5'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container-luxury flex items-center justify-between">
                {/* Desktop Nav Left */}
                <div className="hidden lg:flex items-center gap-12">
                    <NavLink href="#dining" text="Dining" />
                    <NavLink href="#about" text="About" />
                </div>

                {/* Logo (Centered on Desktop, Left/Center on Mobile) */}
                <Link href="#home" className="relative z-50">
                    <motion.div
                        className="text-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-xl md:text-3xl font-display text-white tracking-widest uppercase">
                            Dautari <span className="text-[#e3984e]">Adda</span>
                        </h1>
                    </motion.div>
                </Link>

                {/* Desktop Nav Right */}
                <div className="hidden lg:flex items-center gap-12">
                    <NavLink href="#gallery" text="Gallery" />
                    <NavLink href="#contact" text="Contact" />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white z-50 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 lg:hidden"
                        >
                            <div className="flex flex-col items-center gap-8">
                                <Link href="#dining" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display text-white tracking-widest uppercase hover:text-[#e3984e] transition-colors">Dining</Link>
                                <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display text-white tracking-widest uppercase hover:text-[#e3984e] transition-colors">About</Link>
                                <Link href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display text-white tracking-widest uppercase hover:text-[#e3984e] transition-colors">Gallery</Link>
                                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display text-white tracking-widest uppercase hover:text-[#e3984e] transition-colors">Contact</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
