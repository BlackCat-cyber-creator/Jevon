import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";

interface IShipProps {
  isMobile: boolean;
}

const ShipInBottle: React.FC<IShipProps> = ({ isMobile }) => {
  const computer = useGLTF("./ship_in_a_bottle.glb");
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Dynamic flying rotation and oceanic swell
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.position.y = (isMobile ? -0.4 : 0.0) + Math.sin(state.clock.elapsedTime * 1.6) * 0.14;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    }
  });

  return (
    <group>
      {/* Studio Standard Lighting for Glass & Wood */}
      <ambientLight intensity={1.4} color="#ffffff" />
      <directionalLight position={[8, 12, 8]} intensity={2.5} color="#fffbeb" />
      <directionalLight position={[-8, 6, -4]} intensity={1.5} color="#67e8f9" />
      <pointLight position={[2, 4, 6]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[-2, -2, 4]} intensity={1.0} color="#06b6d4" />

      <group ref={meshRef}>
        {/* Scaled 10% smaller (1.66 on desktop, 1.17 on mobile) */}
        <primitive
          object={computer.scene}
          scale={isMobile ? 1.17 : 1.66}
          position={isMobile ? [0, -0.4, 0] : [3.0, 0.0, 0]}
          rotation={[0, 0, 0]}
        />
      </group>
    </group>
  );
};

const ShipInBottleCanvas: React.FC = () => {
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
    <Canvas
      frameloop="always"
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      camera={{ position: [14, 1.5, 6], fov: isMobile ? 38 : 28 }}
      gl={{
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        antialias: true,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.3}
            target={isMobile ? [0, -0.4, 0] : [2.5, 0.0, 0]}
          />
        )}
        <ShipInBottle isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ShipInBottleCanvas;
