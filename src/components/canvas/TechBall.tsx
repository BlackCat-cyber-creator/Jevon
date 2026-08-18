import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";

interface ITechBallProps {
  imgUrl: string;
  seed?: number;
}

const TechBall: React.FC<ITechBallProps> = ({ imgUrl, seed = 0 }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + seed * 1.7;
      // Gentle look around: Left/Right (-25° to +25°) and Up/Down (-15° to +15°)
      meshRef.current.rotation.y = Math.sin(t * 1.1) * 0.45;
      meshRef.current.rotation.x = Math.sin(t * 0.8 + 1.2) * 0.25;
      meshRef.current.rotation.z = Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Warm Golden Lighting */}
      <ambientLight intensity={0.9} color="#fde68a" />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, -3, 2]} intensity={0.9} color="#f59e0b" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#fbbf24" />
      
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
    </Float>
  );
};

const TechBallCanvas: React.FC<{ icon: string; seed?: number }> = ({ icon, seed = 0 }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.2]}
      style={{ touchAction: "pan-y" }}
      gl={{ preserveDrawingBuffer: false, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
        <TechBall imgUrl={icon} seed={seed} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default TechBallCanvas;
