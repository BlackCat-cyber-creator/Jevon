import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Decal, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ITechBallProps {
  imgUrl: string;
  seed?: number;
}

export const TechBallMesh: React.FC<ITechBallProps> = ({ imgUrl, seed = 0 }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * 1.2 + seed * 2.3;

      // Erratic, lively look-around kinematics that STAY strictly on the front face (never flip backwards)
      meshRef.current.rotation.y = Math.sin(t * 1.4) * 0.45 + Math.sin(t * 2.9) * 0.12; // Max ~33° left/right
      meshRef.current.rotation.x = Math.sin(t * 1.1 + 0.8) * 0.3 + Math.cos(t * 2.3) * 0.08; // Max ~22° up/down
      meshRef.current.rotation.z = Math.sin(t * 0.85 + 1.2) * 0.15; // Erratic tilt

      // Dynamic floating drift within safe bounds
      meshRef.current.position.y = Math.sin(t * 1.6) * 0.06;
      meshRef.current.position.x = Math.cos(t * 1.3) * 0.04;
    }
  });

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={1.3} color="#fffbeb" />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, -2, 2]} intensity={1.2} color="#f59e0b" />
      <pointLight position={[0, 0, 3.5]} intensity={1.4} color="#fbbf24" distance={10} />

      {/* Classic Faceted Icosahedron (scale 1.85 ensures no edge clipping) */}
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

export default TechBallMesh;
