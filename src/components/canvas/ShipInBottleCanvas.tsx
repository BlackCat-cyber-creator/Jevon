import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";
import { fastSin, fastCos } from "../../utils/mathUtils";

interface IShipProps {
  isMobile: boolean;
}

const ShipInBottle: React.FC<IShipProps> = ({ isMobile }) => {
  const computer = useGLTF("./ship_in_a_bottle.glb");
  const meshRef = useRef<THREE.Group>(null!);

  // Enable shadow casting and receiving on model meshes
  useEffect(() => {
    computer.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = isMobile ? 0.9 : 1.2;
          mat.needsUpdate = true;
        }
      }
    });
  }, [computer.scene, isMobile]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      
      // 1. Continuous 360° Circling Rotation
      meshRef.current.rotation.y += delta * 0.38;
      
      // 2. Harmonic Wave Kinematics (Pitch & Roll on oceanic swell)
      meshRef.current.rotation.x = fastSin(t * 0.9) * 0.06;
      meshRef.current.rotation.z = fastCos(t * 0.7) * 0.04;
      
      // 3. Smooth Vertical Wave Bobbing
      const baseY = isMobile ? -0.55 : 0.0;
      meshRef.current.position.y = baseY + fastSin(t * 1.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Studio HDRI Environment */}
      <Environment preset="night" />

      {/* Atmospheric marine hemisphere light */}
      <hemisphereLight args={["#7dd3fc", "#0c1527", 0.8]} />

      {/* Controlled ambient light */}
      <ambientLight intensity={0.7} color="#fffbeb" />

      {/* Key warm directional light with mobile-optimized shadow maps */}
      <directionalLight
        position={[8, 14, 8]}
        intensity={2.4}
        color="#fffbeb"
        castShadow
        shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cyan bioluminescent fill light */}
      <directionalLight position={[-8, 6, -6]} intensity={1.4} color="#67e8f9" />

      {/* Warm golden spotlight to bring out the wooden base and brass plaque details */}
      <pointLight position={[3, 4, 6]} intensity={1.8} color="#fbbf24" distance={20} />

      {/* Soft rim light */}
      <pointLight position={[-3, -2, 4]} intensity={1.0} color="#06b6d4" distance={15} />

      <group ref={meshRef}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.85 : 1.28}
          position={isMobile ? [0, -0.55, 0] : [3.5, 0.0, 0]}
          rotation={[0, 0, 0]}
        />
      </group>

      {/* Grounding Contact Shadow */}
      <ContactShadows
        position={isMobile ? [0, -1.1, 0] : [3.5, -0.75, 0]}
        opacity={isMobile ? 0.5 : 0.6}
        scale={isMobile ? 3.6 : 4.5}
        blur={2.2}
        far={3.5}
        color="#030712"
      />
    </group>
  );
};

const ShipInBottleCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        shadows
        frameloop={isInView ? "always" : "never"}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{
          position: isMobile ? [0, 2.2, 13] : [16, 2.5, 6],
          fov: isMobile ? 34 : 26,
        }}
        gl={{
          preserveDrawingBuffer: false,
          powerPreference: isMobile ? "low-power" : "high-performance",
          antialias: !isMobile,
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {!isMobile && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.3}
              target={[3.0, 0.0, 0]}
            />
          )}
          <ShipInBottle isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ShipInBottleCanvas;
