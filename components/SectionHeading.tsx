'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle: string;
    align?: 'left' | 'center';
}

const SectionHeading = ({ title, subtitle, align = 'center' }: SectionHeadingProps) => {
    return (
        <div className={`mb-24 ${align === 'center' ? 'text-center' : 'text-left'}`}>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white/40 tracking-[0.5em] font-light uppercase text-[10px] mb-6"
            >
                {subtitle}
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl text-white font-light"
            >
                {title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? 'italic font-serif' : 'font-sans font-bold'}>
                        {word}{' '}
                    </span>
                ))}
            </motion.h2>
        </div>
    );
};

export default SectionHeading;
