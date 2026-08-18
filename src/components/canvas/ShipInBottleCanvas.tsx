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

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Smooth harmonic sailing kinematics (No jarring perspective distortion or speed spikes)
      // 1. Gentle yaw glance (Left/Right sway ~25°)
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.45 + (isMobile ? 0 : 0.15);
      
      // 2. Wave pitch (Bow riding crests up/down)
      meshRef.current.rotation.x = Math.sin(t * 0.7 + 0.5) * 0.07;
      
      // 3. Gentle oceanic roll (side tilt)
      meshRef.current.rotation.z = Math.cos(t * 0.4) * 0.05;
      
      // 4. Smooth vertical wave floating
      const baseY = isMobile ? -0.5 : 0.0;
      meshRef.current.position.y = baseY + Math.sin(t * 1.3) * 0.12;
    }
  });

  return (
    <group>
      {/* Studio Balanced Lighting */}
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[6, 10, 8]} intensity={2.2} color="#fffbeb" />
      <directionalLight position={[-6, 4, -4]} intensity={1.4} color="#67e8f9" />
      <pointLight position={[2, 3, 5]} intensity={1.2} color="#fbbf24" />
      <pointLight position={[-2, -2, 3]} intensity={0.8} color="#06b6d4" />

      <group ref={meshRef}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 1.2 : 1.65}
          position={isMobile ? [0, -0.5, 0] : [2.8, 0.0, 0]}
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
        position: [0, 0.5, 9.5],
        fov: isMobile ? 32 : 24,
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
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            target={isMobile ? [0, -0.5, 0] : [2.8, 0.0, 0]}
          />
        )}
        <ShipInBottle isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ShipInBottleCanvas;
