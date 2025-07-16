// components/mini-demos/ProductVariants/FloatingCard.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useTexture } from '@react-three/drei';
import { useRef } from 'react';

function Card() {
  const ref = useRef(null);
  const texture = useTexture('/images/macbook.png'); // replace with your actual UI

  useFrame(({ clock }) => {
    ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.4;
  });

  return (
    <Float speed={2}>
      <mesh ref={ref}>
        <boxGeometry args={[2.4, 1.4, 0.05]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </Float>
  );
}

export default function FloatingCard() {
  return (
    <div className="h-[250px] w-full rounded-t-xl overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <Environment preset="city" />
        <Card />
      </Canvas>
    </div>
  );
}
