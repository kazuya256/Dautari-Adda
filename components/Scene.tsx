'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Particle = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
            <mesh position={position}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
};

const ParticlesGroup = () => {
    // Generate random positions for particles
    const particles = useMemo(() => {
        return [...Array(40)].map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8
            ] as [number, number, number],
            color: Math.random() > 0.5 ? '#e3984e' : '#ffffff', // Gold or White
            speed: Math.random() * 1.5 + 0.5
        }));
    }, []);

    return (
        <group>
            {particles.map((p, i) => (
                <Particle key={i} position={p.position} color={p.color} speed={p.speed} />
            ))}
        </group>
    );
};

const Scene = () => {
    return (
        <div className="absolute inset-0 z-[1] w-full h-full pointer-events-none">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 10, 5]} intensity={1} color="#e3984e" />
                <pointLight position={[-10, 5, -5]} intensity={1} color="white" />

                <Stars
                    radius={50}
                    depth={50}
                    count={1000}
                    factor={3}
                    saturation={0}
                    fade
                    speed={0.3}
                />

                <ParticlesGroup />
            </Canvas>
        </div>
    );
};

export default Scene;
