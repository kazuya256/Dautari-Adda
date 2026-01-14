'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

const ContactInfo = () => {
    return (
        <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3984e]/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="container-luxury px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#e3984e] text-xs font-bold tracking-[0.4em] uppercase block mb-4"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-light text-white"
                    >
                        Contact <span className="italic text-gray-500">Us</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Contact Details */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#111] p-10 border border-white/5 relative group hover:border-[#e3984e]/30 transition-colors duration-500"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#e3984e] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                            <h3 className="text-3xl font-display text-white mb-8">Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="bg-[#1a1a1a] p-4 rounded-full text-[#e3984e]">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Location</p>
                                        <p className="text-xl text-white font-light">Kirtipur, Kathmandu</p>
                                        <p className="text-sm text-gray-400 font-light mt-1">Near TU Gate, Nepal</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="bg-[#1a1a1a] p-4 rounded-full text-[#e3984e]">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</p>
                                        <p className="text-xl text-white font-light">+977 985-1430250</p>
                                        <p className="text-sm text-gray-400 font-light mt-1">Mon-Sun, 9am - 10pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="bg-[#1a1a1a] p-4 rounded-full text-[#e3984e]">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</p>
                                        <p className="text-xl text-white font-light">dautariadda@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-[500px] w-full bg-[#111] relative overflow-hidden border border-white/5 p-2"
                    >
                        {/* Styled Map Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-10 border-[20px] border-[#111]/50"></div>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.854651370215!2d85.27741366977539!3d27.674987600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a000000001%3A0x1234567890abcdef!2sKirtipur%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
