import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Group } from 'three';

import CanvasLoader from "../layout/CanvasLoader";

const ShipInBottle: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("./ship_in_a_bottle.glb");
  const meshRef = useRef<Group>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      // Apply rotation and sway for both mobile and desktop
      meshRef.current.rotation.y += 0.005; // Existing rotation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Only apply the oscillating sway
    }
  });

  return (
    <group>
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight
        position={isMobile ? [0, 0, 7] : [0, 0, 17]}
        angle={0.6}
        penumbra={1}
        intensity={isMobile ? 100 : 400}
        castShadow
        shadow-mapSize={isMobile ? 1024 : 4096}
      />
      <pointLight intensity={isMobile ? 100 : 400} />
      <group ref={meshRef}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 1.2 : 2.0}
          position={isMobile ? [2, -1.5, 0] : [5.0, -3.5, 0]}
          rotation={isMobile ? [0, 0, 0] : [0, 0, 0.05]}
        />
      </group>
    </group>
  );
};

const ShipInBottleCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={isMobile ? [1, 1] : [1, 1.5]} /* Adjusted dpr for better performance on various devices */
      camera={{ position: [20, 3, 5], fov: isMobile ? 35 : 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            target={[0, -3.0, 0]}
          />
        )}
        <ShipInBottle isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ShipInBottleCanvas;
