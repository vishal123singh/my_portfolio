'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import ProductSidebar from '@/app/components/playground/ProductSidebar';
import ProductViewer from '@/app/components/playground/ProductViewer';

export default function ProductDemoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col sm:flex-row items-center justify-center gap-10 px-4 py-10">
      {/* 3D Viewer */}
      <div className="h-[600px] w-full sm:w-[600px] mx-auto bg-transparent">
        <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} />
          <ProductViewer />
        </Canvas>
      </div>

      {/* Sidebar */}
      <ProductSidebar />
    </main>
  );
}
