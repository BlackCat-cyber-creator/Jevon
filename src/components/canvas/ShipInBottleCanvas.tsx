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
      const t = state.clock.getElapsedTime();
      
      // 1. Continuous 360° Circling Rotation
      meshRef.current.rotation.y += delta * 0.38;
      
      // 2. Harmonic Wave Kinematics (Pitch & Roll on oceanic swell)
      meshRef.current.rotation.x = Math.sin(t * 0.9) * 0.06;
      meshRef.current.rotation.z = Math.cos(t * 0.7) * 0.04;
      
      // 3. Smooth Vertical Wave Bobbing
      const baseY = isMobile ? -0.4 : 0.0;
      meshRef.current.position.y = baseY + Math.sin(t * 1.5) * 0.12;
    }
  });

  return (
    <group>
      {/* Studio Standard Lighting */}
      <ambientLight intensity={1.4} color="#ffffff" />
      <directionalLight position={[8, 12, 8]} intensity={2.2} color="#fffbeb" />
      <directionalLight position={[-8, 6, -4]} intensity={1.4} color="#67e8f9" />
      <pointLight position={[2, 4, 6]} intensity={1.3} color="#fbbf24" />
      <pointLight position={[-2, -2, 4]} intensity={0.9} color="#06b6d4" />

      <group ref={meshRef}>
        {/* Compact scale with right-side placement so it never covers the text or clips */}
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.95 : 1.28}
          position={isMobile ? [0, -0.4, 0] : [3.5, 0.0, 0]}
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
      camera={{
        position: [16, 2.5, 6],
        fov: isMobile ? 36 : 26,
      }}
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
            target={isMobile ? [0, -0.4, 0] : [3.0, 0.0, 0]}
          />
        )}
        <ShipInBottle isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ShipInBottleCanvas;
