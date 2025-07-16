// components/mini-demos/ProductVariants/HtmlOverlay.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';

function UIBlock() {
  return (
    <Html center>
      <div className="bg-white text-black rounded-xl shadow-md w-40 h-64 flex flex-col justify-center items-center text-center text-sm p-2">
        <h4 className="font-semibold mb-2">Product UI</h4>
        <p>Interactive mock UI</p>
      </div>
    </Html>
  );
}

export default function HtmlOverlay() {
  return (
    <div className="h-[250px] w-full rounded-t-xl bg-black">
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <Environment preset="sunset" />
        <UIBlock />
      </Canvas>
    </div>
  );
}
