"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

function ChatModel() {
  const { scene } = useGLTF("/models/chat_bubble_icon.glb");
  const modelRef = useRef();

  useEffect(() => {
    // Ensure material fallback
    scene.traverse((child) => {
      if (child.isMesh && !child.material) {
        child.material = new THREE.MeshStandardMaterial({ color: "#00f7ff" });
      }
    });
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={modelRef} scale={1.2} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function ChatIcon3D() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={1.2} />
        <Environment preset="city" />
        <ChatModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
