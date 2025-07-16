// components/mini-demos/ProductVariants/GsapUnbox.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

function UnboxAnimation() {
  const groupRef = useRef(null);
  const screenRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'back.out(1.7)' } });
    tl.fromTo(groupRef.current.position, { y: 2 }, { y: 0 })
      .fromTo(bodyRef.current.position, { z: -1 }, { z: 0 }, '<')
      .fromTo(screenRef.current.position, { z: 1 }, { z: 0 }, '<');
  }, []);

  return (
    <group ref={groupRef}>
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.2, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[1.1, 2.1]} />
        <meshStandardMaterial color="#00f7ff" />
      </mesh>
    </group>
  );
}

export default function GsapUnbox() {
  return (
    <div className="h-[250px] w-full rounded-t-xl bg-black">
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
        <UnboxAnimation />
      </Canvas>
    </div>
  );
}
