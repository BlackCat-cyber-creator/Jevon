import React, { Suspense, memo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";

interface IBallProps {
  imgUrl: string;
  seed?: number;
}

const Ball: React.FC<IBallProps> = ({ imgUrl, seed = 0 }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * 1.2 + seed * 2.3;
      
      // Erratic, lively look-around kinematics that STAY strictly on the front face (never flip backwards)
      meshRef.current.rotation.y = Math.sin(t * 1.4) * 0.45 + Math.sin(t * 2.9) * 0.12; // Max ~33° left/right
      meshRef.current.rotation.x = Math.sin(t * 1.1 + 0.8) * 0.3 + Math.cos(t * 2.3) * 0.08; // Max ~22° up/down
      meshRef.current.rotation.z = Math.sin(t * 0.85 + 1.2) * 0.15; // Erratic tilt
      
      // Dynamic floating drift (calibrated to stay safely within viewport margins)
      meshRef.current.position.y = Math.sin(t * 1.6) * 0.06;
      meshRef.current.position.x = Math.cos(t * 1.3) * 0.04;
    }
  });

  return (
    <group>
      {/* Warm Golden Studio Lighting */}
      <ambientLight intensity={1.3} color="#fffbeb" />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, -2, 2]} intensity={1.2} color="#f59e0b" />
      <pointLight position={[0, 0, 3.5]} intensity={1.4} color="#fbbf24" distance={10} />

      {/* Classic Faceted Icosahedron */}
      <mesh ref={meshRef} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f59e0b"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.28}
          metalness={0.45}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={0.95}
          map={decal}
        />
      </mesh>
    </group>
  );
};

interface ITechBallCanvasProps {
  icon: string;
  seed?: number;
}

export const TechBallCanvas: React.FC<ITechBallCanvasProps> = memo(({ icon, seed = 0 }) => {
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
      dpr={isMobile ? [1, 1] : [1, 1.2]}
      gl={{
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
        antialias: !isMobile,
      }}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minAzimuthAngle={-Math.PI / 3.2}
          maxAzimuthAngle={Math.PI / 3.2}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.6}
          rotateSpeed={0.8}
        />
        <Ball imgUrl={icon} seed={seed} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
});

export default TechBallCanvas;
