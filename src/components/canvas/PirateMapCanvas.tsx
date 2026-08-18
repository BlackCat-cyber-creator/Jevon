import { Suspense, memo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin } from "lucide-react";

import CanvasLoader from "../layout/CanvasLoader";

interface IPirateMapProps {
  isMobile: boolean;
}

const MapPinMarker = ({ position, label, sub }: { position: [number, number, number]; label: string; sub: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? "#22d3ee" : "#f59e0b"}
          emissive={hovered ? "#06b6d4" : "#d97706"}
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>

      <Html position={[0, 0.35, 0]} center distanceFactor={8}>
        <div
          className={`pointer-events-none transition-all duration-200 ${
            hovered ? "scale-105 opacity-100" : "scale-95 opacity-80"
          }`}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-slate-950/90 px-2.5 py-1 text-[11px] font-medium text-amber-300 shadow-md backdrop-blur-md whitespace-nowrap">
            <MapPin size={11} className="text-cyan-400" />
            <span>{label}</span>
            <span className="text-[10px] text-slate-400">({sub})</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

const PirateMap: React.FC<IPirateMapProps> = ({ isMobile }) => {
  const earth = useGLTF("./pirates_map.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group>
      {/* Studio Balanced Lighting */}
      <ambientLight intensity={1.4} color="#ffffff" />
      <directionalLight position={[6, 10, 6]} intensity={2.2} color="#fffbeb" />
      <directionalLight position={[-6, -2, -4]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[0, 4, 6]} intensity={1.2} color="#fbbf24" />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
        <group ref={ref} position={[0, -0.1, 0]}>
          <primitive object={earth.scene} scale={isMobile ? 6.2 : 7.6} position-y={0} />

          {/* Interactive Beacon Pins */}
          <MapPinMarker position={[0.8, 0.6, 1.2]} label="Origin" sub="Indonesia" />
          <MapPinMarker position={[-1.2, 0.8, -0.4]} label="Global" sub="Worldwide Remote" />
        </group>
      </Float>
    </group>
  );
};

const MemoizedPirateMap = memo(PirateMap);

const PirateMapCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="relative h-full w-full">
      <Canvas
        frameloop="always"
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ preserveDrawingBuffer: false, antialias: true, powerPreference: "high-performance" }}
        camera={{
          fov: isMobile ? 40 : 32,
          near: 0.1,
          far: 200,
          position: [-3.5, 2.0, 5.0],
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {!isMobile && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.5}
              rotateSpeed={0.8}
              target={[0, 0, 0]}
            />
          )}
          <MemoizedPirateMap isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PirateMapCanvas;
