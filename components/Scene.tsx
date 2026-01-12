'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.05;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1.2, 128, 128]} scale={2}>
                <MeshDistortMaterial
                    color="#ffffff"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0}
                    metalness={1}
                    reflectivity={1}
                    clearcoat={1}
                />
            </Sphere>
        </Float>
    );
};

const Scene = () => {
    return (
        <div className="absolute inset-0 z-0 h-screen w-full overflow-hidden bg-black">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.1} />

                {/* Stark White Lighting */}
                <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1.5} color="white" />
                <pointLight position={[-10, 5, -5]} intensity={1} color="white" />

                <Stars
                    radius={100}
                    depth={50}
                    count={2000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.2}
                />

                <AnimatedSphere />

                {/* Monochromatic particles */}
                {[...Array(15)].map((_, i) => (
                    <Float key={i} speed={0.5} rotationIntensity={1} floatIntensity={1}>
                        <mesh position={[
                            (Math.random() - 0.5) * 12,
                            (Math.random() - 0.5) * 12,
                            (Math.random() - 0.5) * 6
                        ]}>
                            <boxGeometry args={[0.02, 0.02, 0.02]} />
                            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
                        </mesh>
                    </Float>
                ))}
            </Canvas>
        </div>
    );
};

export default Scene;
