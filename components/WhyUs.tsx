'use client';

import { motion } from 'framer-motion';
import { Utensils, Sprout, Star } from 'lucide-react'; // Using Lucide React for icons if available, otherwise SVGs

const features = [
    {
        icon: <Utensils className="w-6 h-6 text-[#e3984e]" />,
        title: "Traditional & Modern Fusion",
        description: "Experiencing the best of both worlds with our curated menu that honors roots while embracing innovation."
    },
    {
        icon: <Sprout className="w-6 h-6 text-[#e3984e]" />,
        title: "Peaceful Environment",
        description: "Escape the city noise in our serene, garden-inspired ambience designed for relaxation and conversation."
    },
    {
        icon: <Star className="w-6 h-6 text-[#e3984e]" />,
        title: "Premium Hospitality",
        description: "Our dedicated staff ensures every moment of your stay is treated with the utmost care and attention."
    }
];

const WhyUs = () => {
    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3984e]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container-luxury relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold uppercase tracking-[0.3em] text-[#e3984e] mb-4 block"
                    >
                        Our Promise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-light text-white"
                    >
                        Why Choose <span className="italic text-gray-500">Dautari?</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="bg-[#111] p-8 border border-white/5 group hover:border-[#e3984e]/30 transition-colors duration-500"
                        >
                            <div className="bg-[#1a1a1a] w-14 h-14 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-display text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
