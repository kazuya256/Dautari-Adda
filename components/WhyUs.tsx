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
        <section className="py-32 bg-[#080808] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#e3984e]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="container-luxury relative z-10">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold uppercase tracking-[0.4em] text-[#e3984e] mb-6 block"
                    >
                        The Dautari Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display text-white leading-tight"
                    >
                        More Than Just <span className="italic text-white/50">Dining</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-gray-400 font-light leading-relaxed"
                    >
                        We create moments that linger. From our carefully placed lights to the texture of our napkins, every detail is orchestrated for your delight.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (idx * 0.1), duration: 0.8, ease: "easeOut" }}
                            className="bg-[#0f0f0f] p-10 relative group border border-white/5 hover:border-[#e3984e]/20 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-[#e3984e]/0 to-[#e3984e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 flex items-center justify-center mb-8 text-[#e3984e] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-display text-white mb-4 group-hover:text-[#e3984e] transition-colors">{feature.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
