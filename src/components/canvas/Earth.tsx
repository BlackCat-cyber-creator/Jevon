import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Earth = () => {
  const earth = useGLTF("./pirates_map.glb");

  return (
    <primitive object={earth.scene} scale={8} position-y={-1} rotation-y={0} />
  );
};

const MemoizedEarth = memo(Earth);

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-10, 15, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1500}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={500} position={[0, 0, -30]} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <MemoizedEarth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
