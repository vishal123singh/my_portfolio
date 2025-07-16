'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ProductViewerContent() {
  const meshRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      meshRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: 'elastic.out(1, 0.4)' }
    );
    gsap.fromTo(
      meshRef.current.rotation,
      { y: Math.PI },
      { y: 0, duration: 1.4, ease: 'power3.out' }
    );
  }, []);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y += 0.002;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.05;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#60A5FA"
        metalness={0.4}
        roughness={0.1}
        emissive="#1E40AF"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
