import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import * as THREE from "three";
import { TypedArray } from "three";

const StarsBackground = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState<TypedArray>(() =>
    random.inSphere(new Float32Array(1200), { radius: 1.4 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const StarsBackgroundCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1]}
        gl={{ preserveDrawingBuffer: false, antialias: false, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <StarsBackground />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsBackgroundCanvas;
