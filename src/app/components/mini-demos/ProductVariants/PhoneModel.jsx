// components/mini-demos/ProductVariants/PhoneModel.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function Phone() {
  const { scene } = useGLTF('/models/iphone_16.glb'); // place in public/models
  useFrame(() => {
    scene.rotation.y += 0.01;
  });

  return <primitive object={scene} scale={0.1} />;
}

export default function PhoneModel() {
  return (
    <div className="h-[250px] w-full bg-black rounded-t-xl">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 55 }}>
        <ambientLight />
        <Environment preset="sunset" />
        <Phone />
      </Canvas>
    </div>
  );
}
