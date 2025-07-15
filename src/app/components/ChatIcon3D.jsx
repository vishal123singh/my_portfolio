// ChatIcon3D.jsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function ChatModel() {
  const { scene } = useGLTF('/models/chat_bubble_icon.glb');
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return <primitive ref={ref} object={scene} position={[0, -0.2, 0]} scale={0.8} />;
}

export default function ChatIcon3D({ onClick }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Environment preset="city" />
        <ChatModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
  );
}
