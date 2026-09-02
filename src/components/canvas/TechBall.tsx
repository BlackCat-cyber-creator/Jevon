import React, { Suspense, memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";

interface ITechBallProps {
  imgUrl: string;
  seed?: number;
}

// 3D Mesh Component (Used directly on mobile unified View and inside desktop Canvas)
export const TechBallMesh: React.FC<ITechBallProps> = ({ imgUrl, seed = 0 }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + seed * 1.7;
      // Gentle look around: Left/Right (-25° to +25°) and Up/Down (-15° to +15°) — strictly front-facing, never backwards
      meshRef.current.rotation.y = Math.sin(t * 1.1) * 0.45;
      meshRef.current.rotation.x = Math.sin(t * 0.8 + 1.2) * 0.25;
      meshRef.current.rotation.z = Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <group>
      {/* Warm Golden Lighting */}
      <ambientLight intensity={1.1} color="#fde68a" />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -3, 2]} intensity={0.9} color="#f59e0b" />
      <pointLight position={[0, 0, 3]} intensity={0.9} color="#fbbf24" />

      {/* Rich Radiant Gold Icosahedron */}
      <mesh ref={meshRef} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f59e0b" // Rich Amber Gold
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.25}
          metalness={0.5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1.05}
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

// Dedicated Canvas for Desktop (Zero scroll drag lag)
export const TechBallCanvas: React.FC<ITechBallCanvasProps> = memo(({ icon, seed = 0 }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.2]}
      gl={{
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        antialias: true,
      }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.6}
          rotateSpeed={0.8}
        />
        <TechBallMesh imgUrl={icon} seed={seed} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
});

export default TechBallCanvas;
