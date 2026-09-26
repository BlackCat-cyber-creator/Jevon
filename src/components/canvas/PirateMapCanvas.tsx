import { Suspense, memo, useRef, useEffect, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/CanvasLoader";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface IPirateMapProps {
  isMobile: boolean;
}

const PirateMap: React.FC<IPirateMapProps> = ({ isMobile }) => {
  const earth = useGLTF("./pirates_map.glb");
  const ref = useRef<THREE.Group>(null);

  // Enable shadow casting and receiving on map meshes
  useEffect(() => {
    earth.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = isMobile ? 0.8 : 1.0;
          mat.needsUpdate = true;
        }
      }
    });
  }, [earth.scene, isMobile]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group>
      {/* Environment reflections */}
      <Environment preset="night" />

      {/* Warm parchment hemisphere light */}
      <hemisphereLight args={["#fef3c7", "#0c1527", 0.7]} />

      {/* Controlled ambient light */}
      <ambientLight intensity={0.7} color="#fffbeb" />

      {/* Key directional light with mobile-optimized shadow maps */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={isMobile ? [512, 512] : [1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft cyan ocean fill light */}
      <directionalLight position={[-8, 6, -4]} intensity={1.2} color="#7dd3fc" />

      {/* Warm golden point light */}
      <pointLight position={[0, 3, 5]} intensity={1.8} color="#f59e0b" distance={18} />

      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.15}>
        <group ref={ref} position={[0, 0, 0]}>
          <primitive object={earth.scene} scale={isMobile ? 3.9 : 5.8} position-y={0} />
        </group>
      </Float>

      {/* Spatial shadow */}
      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.55}
        scale={isMobile ? 5.2 : 7}
        blur={2.8}
        far={4.5}
        color="#030712"
      />
    </group>
  );
};

const MemoizedPirateMap = memo(PirateMap);

const PirateMapCanvas: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(containerRef, false);

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
    <div ref={containerRef} className="relative h-full w-full">
      <Canvas
        shadows
        frameloop={isInView ? "always" : "never"}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          preserveDrawingBuffer: false,
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        camera={{
          fov: isMobile ? 38 : 30,
          near: 0.1,
          far: 200,
          position: isMobile ? [-1.8, 1.8, 6.2] : [-2.5, 1.8, 5.8],
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
