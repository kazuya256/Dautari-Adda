'use client';

import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="bg-[#e3984e] text-black py-2 overflow-hidden relative z-50">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <span className="text-sm font-bold tracking-widest uppercase">
                            ✨ Grand Re-Opening Special: 20% OFF on all Traditional Thalis
                        </span>
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                    </div>
                ))}
            </div>
            {/* Tailwind config needs animation: marquee: 'marquee 25s linear infinite' */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Marquee;
