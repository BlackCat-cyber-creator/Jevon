import { Suspense, memo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../layout/CanvasLoader";

const PirateMap: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const earth = useGLTF("./pirates_map.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 - 1;
    }
  });

  return (
    <group>
      <hemisphereLight intensity={0.1} groundColor="black" />
      <spotLight
        position={[0, 8, 3]} /* Adjusted position */
        angle={0.5}
        penumbra={1}
        intensity={isMobile ? 100 : 300}
        castShadow
        shadow-mapSize={isMobile ? 1024 : 4096}
      />
      <pointLight intensity={isMobile ? 100 : 300} position={[0, 8, -3]} />
      <group ref={ref}>
        <primitive object={earth.scene} scale={8} position-y={0} rotation-y={0} />
      </group>
    </group>
  );
};

const MemoizedPirateMap = memo(PirateMap);

const PirateMapCanvas = () => {
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
      shadows
      frameloop="always"
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: isMobile ? 55 : 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            // autoRotate
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            target={[0, 0, 0]}
          />
        )}
        <MemoizedPirateMap isMobile={isMobile} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default PirateMapCanvas;
