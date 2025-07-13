import { Html, useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load">
        <p
          className="text-f1f1f1 mt-10 text-sm font-extrabold"
        >
          {progress.toFixed(2)}%
        </p>
      </span>
    </Html>
  );
};

export default CanvasLoader;
