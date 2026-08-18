import { Suspense, memo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";

interface IPirateMapProps {
  isMobile: boolean;
}

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
      <ambientLight intensity={1.6} color="#ffffff" />
      <directionalLight position={[6, 10, 6]} intensity={2.2} color="#fffbeb" />
      <directionalLight position={[-6, -2, -4]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[0, 4, 6]} intensity={1.2} color="#fbbf24" />

      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.15}>
        <group ref={ref} position={[0, 0, 0]}>
          {/* Scaled proportionally so the 3D scroll map is 100% unclipped in all orientations */}
          <primitive object={earth.scene} scale={isMobile ? 3.6 : 4.6} position-y={0} />
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
          fov: isMobile ? 42 : 32,
          near: 0.1,
          far: 200,
          position: [0, 2.2, 7.5],
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
