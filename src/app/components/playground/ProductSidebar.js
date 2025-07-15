export default function ProductSidebar() {
  return (
    <div className="max-w-md space-y-6 text-white px-4 py-6 sm:py-10 sm:px-8">
      <h1 className="text-4xl font-bold leading-tight">
        QuantumX Cube
      </h1>
      <p className="text-white/80">
        The QuantumX Cube is a revolutionary product designed for speed, stability, and innovation.
        It features next-gen rendering, smart motion handling, and a sleek minimalist body.
      </p>
      <ul className="space-y-2 text-sm text-white/60">
        <li>✅ Ultra-smooth 3D transitions</li>
        <li>✅ GSAP powered animations</li>
        <li>✅ Modular WebGL component</li>
      </ul>
      <button className="mt-4 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
        Buy Now
      </button>
    </div>
  );
}
