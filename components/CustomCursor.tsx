'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', mouseMove);

        const interactables = document.querySelectorAll('button, a, .group');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            interactables.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-difference"
            animate={{
                x: mousePosition.x - 24,
                y: mousePosition.y - 24,
                scale: isHovering ? 2.5 : 1,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        >
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="absolute inset-0 border border-white rounded-full opacity-50" />
        </motion.div>
    );
};

export default CustomCursor;
