import { useState, useRef, Suspense, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

// High-performance sphere point generator without external dependencies
function generateSpherePoints(count: number, radius: number): Float32Array {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);
    points[i * 3] = r * sinPhi * Math.cos(theta);
    points[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
}

const StarsBackground = ({ isMobile, ...props }: { isMobile: boolean }) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState<Float32Array>(() =>
    generateSpherePoints(isMobile ? 500 : 900, 1.4)
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={isMobile ? 0.0025 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const StarsBackgroundCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(containerRef, true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[-1] h-full w-full pointer-events-none">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1]}
          gl={{ preserveDrawingBuffer: false, antialias: false, powerPreference: "low-power" }}
        >
          <Suspense fallback={null}>
            <StarsBackground isMobile={isMobile} />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default StarsBackgroundCanvas;
