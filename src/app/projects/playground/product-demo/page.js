"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useProgress,
  PerspectiveCamera,
  Float,
} from "@react-three/drei";
import { Loader } from "@/components/ui/loader";
import ProductSidebar from "@/app/components/playground/ProductSidebar";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function RendererSetup() {
  const { gl } = useThree();

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);

  return null;
}

function CustomLoader() {
  const { progress } = useProgress();
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ delay: progress === 100 ? 0.5 : 0 }}
      className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
    >
      <div className="text-center space-y-4">
        <Loader className="h-12 w-12 mx-auto text-emerald-400" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full max-w-xs mx-auto"
        />
        <p className="text-sm text-white/80">
          Loading 3D model... {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}

function ProductViewer({ color = "#3b82f6", highlight, mouse }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth rotation towards cursor
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * Math.PI * 0.7,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * Math.PI * 0.3,
      0.05
    );

    // Position parallax and floating
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.x * 0.5,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      Math.sin(t * 2) * 0.1 + mouse.y * 0.5,
      0.05
    );
    meshRef.current.position.z = Math.sin(t * 1.5) * 0.1;

    // Pulsating scale
    const scale = 1 + Math.sin(t * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.2}
          thickness={1}
          ior={1.45}
          envMapIntensity={1.2}
          emissive={hovered ? "#00fff0" : "#111111"}
          emissiveIntensity={hovered ? 0.7 : 0.2}
        />
      </mesh>

      {/* Optional: Edge highlights */}
      {/* <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.51, 1.51, 1.51)]} />
        <lineBasicMaterial color="#00fff0" transparent opacity={0.8} />
      </lineSegments> */}
    </group>
  );
}

export default function ProductDemoPage() {
  const [activeColor, setActiveColor] = useState("#3b82f6");
  const [activeFeature, setActiveFeature] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = -(e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleColorChange = (color) => {
    setActiveColor(color);
    if (isMobile && window.navigator.vibrate) window.navigator.vibrate(10);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Background lights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-[120px] opacity-30"
          style={{
            x: mouse.x * 50,
            y: mouse.y * 50,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-[120px] opacity-30"
          style={{
            x: mouse.x * 50,
            y: mouse.y * 50,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] w-full lg:h-[80vh] lg:w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-gray-900/20 to-black/30 pointer-events-none z-10" />
          <Canvas
            ref={canvasRef}
            shadows={!isMobile}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            className="absolute inset-0"
          >
            <RendererSetup />
            <PerspectiveCamera makeDefault fov={45} position={[0, 1.5, 4]} />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize={2048}
              shadow-camera-far={50}
              color="#ffffff"
            />
            <Environment preset="studio" />
            <OrbitControls
              enableZoom={!isMobile}
              enablePan={false}
              enableRotate={false} // cursor controls rotation
            />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <ProductViewer
                color={activeColor}
                highlight={activeFeature}
                mouse={mouse}
              />
            </Float>
          </Canvas>
          <CustomLoader />

          {/* Info badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/20 text-xs flex items-center gap-2 z-20"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              3D Interactive Viewer
            </span>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 max-w-lg"
        >
          <ProductSidebar
            activeColor={activeColor}
            onColorChange={handleColorChange}
            onFeatureHover={setActiveFeature}
          />
        </motion.div>
      </div>

      {/* Mobile hint */}
      {isMobile && (
        <AnimatePresence>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-4 left-0 right-0 flex justify-center z-30 px-4"
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-black/80 backdrop-blur-lg px-4 py-3 rounded-xl border border-white/10 text-sm flex items-center gap-2 shadow-lg"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <span className="text-white">Touch and drag to rotate</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
}
