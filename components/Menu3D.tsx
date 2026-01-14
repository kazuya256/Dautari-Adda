
'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface MenuItem {
    name: string;
    text: string;
    price: string;
}

interface MenuCategory {
    title: string;
    items: MenuItem[];
}

interface Menu3DProps {
    categories: MenuCategory[];
    onClose: () => void;
}

const MenuPage = ({ categories, onClose }: { categories: MenuCategory[], onClose: () => void }) => {
    const group = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    // Responsive Scale Calculation
    const targetHeight = viewport.height * 0.85;
    const targetWidth = viewport.width * 0.90;

    const scaleH = targetHeight / 11;
    const scaleW = targetWidth / 8.5;
    const scale = Math.min(scaleH, scaleW, 0.9);

    useFrame((state) => {
        if (group.current) {
            // Gentle mouse tilt
            const x = (mouse.x * viewport.width) / 100;
            const y = (mouse.y * viewport.height) / 100;
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.1);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
        }
    });

    return (
        <group ref={group} scale={[scale, scale, scale]}>
            <Float
                speed={2}
                rotationIntensity={0.2}
                floatIntensity={0.5}
                floatingRange={[-0.1, 0.1]}
            >
                {/* The Physical Menu Board - Dark Matte Finish */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[8.5, 11, 0.1]} />
                    <meshStandardMaterial
                        color="#0f0f0f"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* Metallic Gold Edge Band */}
                <mesh position={[0, 0, -0.06]} scale={[1.01, 1.01, 1]} >
                    <boxGeometry args={[8.5, 11, 0.1]} />
                    <meshStandardMaterial color="#c68e17" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* HTML Content Layer */}
                <Html
                    transform
                    center
                    occlude={false}
                    zIndexRange={[100, 0]}
                    position={[0, 0, 0.1]} // Lifted slightly off the board
                    scale={0.45}
                    style={{
                        width: '850px',
                        height: '1100px',
                        pointerEvents: 'auto'
                    } as any}
                >
                    <div
                        style={{
                            width: '850px',
                            height: '1100px',
                        }}
                        className="bg-[#0F0F0F] text-white p-16 flex flex-col items-center border-[3px] border-[#e3984e] shadow-2xl relative select-none"
                    >

                        {/* Subtle Texture Pattern Overlay - CSS Gradient instead of Image for Speed */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>

                        {/* Corner Ornaments */}
                        <div className="absolute top-6 left-6 w-32 h-32 border-t-[1px] border-l-[1px] border-[#e3984e] opacity-60"></div>
                        <div className="absolute top-6 right-6 w-32 h-32 border-t-[1px] border-r-[1px] border-[#e3984e] opacity-60"></div>
                        <div className="absolute bottom-6 left-6 w-32 h-32 border-b-[1px] border-l-[1px] border-[#e3984e] opacity-60"></div>
                        <div className="absolute bottom-6 right-6 w-32 h-32 border-b-[1px] border-r-[1px] border-[#e3984e] opacity-60"></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="pointer-events-auto absolute top-8 right-8 text-[#e3984e] hover:text-white transition-colors z-50 p-2 text-2xl"
                        >
                            ✕
                        </button>

                        {/* Logo / Header */}
                        <div className="text-center mb-10 mt-6 z-10 w-full">
                            <h1 className="text-7xl font-display italic mb-4 text-[#e3984e] drop-shadow-md">Dautari <span className="text-white">Adda</span></h1>
                            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#e3984e] to-transparent mx-auto"></div>
                            <p className="text-sm uppercase tracking-[0.5em] text-gray-400 mt-4">Fine Dining Menu</p>
                        </div>

                        {/* Scrollable List */}
                        <div
                            className="w-full flex-1 min-h-0 overflow-y-auto pointer-events-auto pr-6 scrollbar-thin scrollbar-thumb-[#e3984e] scrollbar-track-[#1a1a1a] z-10"
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div className="space-y-12 pb-10">
                                {categories && categories.length > 0 ? (
                                    categories.map((cat, idx) => (
                                        <div key={idx} className="space-y-6">
                                            <h3 className="text-4xl font-['Playfair_Display'] italic text-[#e3984e] border-b border-white/10 pb-3 text-center sticky top-0 bg-[#0F0F0F] z-20 py-2">{cat.title}</h3>
                                            <ul className="space-y-6">
                                                {cat.items.map((item, i) => (
                                                    <li key={i} className="group relative">
                                                        <div className="flex justify-between items-baseline mb-2">
                                                            <span className="text-3xl font-['Playfair_Display'] italic tracking-wide group-hover:text-[#e3984e] transition-colors">{item.name}</span>
                                                            <span className="text-[#e3984e] font-bold text-xl font-['Cormorant_Garamond']">{item.price}</span>
                                                        </div>
                                                        <p className="text-lg text-gray-300 font-light leading-relaxed font-['Playfair_Display']">{item.text}</p>
                                                        {/* Dot leader visual */}
                                                        <div className="absolute left-0 bottom-0 w-full border-b border-white/5 border-dashed opacity-30 mt-4"></div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <span className="text-[#e3984e] uppercase tracking-widest text-xs animate-pulse">Loading Menu Items...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 text-center opacity-30 z-10">
                            <p className="text-[10px] uppercase tracking-[0.4em]">Taste of Kritipur</p>
                        </div>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

const Menu3D = ({ categories, onClose }: Menu3DProps) => {
    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
            <div className="w-full h-full">
                <Canvas flat camera={{ position: [0, 0, 10], fov: 35 }}>
                    {/* Reliable Lighting Setup (No Suspsense/Environment for stability) */}
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, -5, -10]} intensity={0.5} color="#e3984e" />

                    <MenuPage categories={categories} onClose={onClose} />
                </Canvas>
            </div>

            {/* Mobile/Accessibility Close Button */}
            <div className="absolute top-8 right-8 z-[201] md:hidden">
                <button
                    onClick={onClose}
                    className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                >
                    ✕ Close
                </button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest pointer-events-none">
                DRAG TO TILT • CLICK TO CLOSE
            </div>
        </div>
    );
};

export default Menu3D;
