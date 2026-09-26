import { useState, useRef, Suspense, useEffect, memo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { View, Preload, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

import { TechBallMesh, TechBallCanvas } from "../canvas/TechBall";
import { techClusters, technologies } from "../../constants/technologies";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { styles } from "../../constants/styles";
import type { TTechnology } from "../../types";

let texturesPreloaded = false;

const TechnologiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [activeTech, setActiveTech] = useState<TTechnology | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Preload all textures into memory
    if (!texturesPreloaded) {
      technologies.forEach((t) => {
        try {
          useTexture.preload(t.icon);
        } catch {
          // Ignore if already cached
        }
      });
      texturesPreloaded = true;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const handleTechToggle = useCallback((tech: TTechnology) => {
    setActiveTech((prev) => prev?.name === tech.name ? null : tech);
  }, []);

  const handleMouseEnter = useCallback((tech: TTechnology) => {
    setActiveTech(tech);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveTech(null);
  }, []);

  return (
    <section
      id="tech"
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span">&nbsp;</span>

      <div ref={containerRef} className="relative">
        {/* On Mobile: 1 Single Unified WebGL Canvas (Eliminates mobile WebGL context limit crashes & sad emoji) */}
        {isMobile && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas
              eventSource={containerRef}
              dpr={[1, 1]}
              gl={{
                preserveDrawingBuffer: false,
                powerPreference: "low-power",
                antialias: false,
              }}
            >
              <View.Port />
              <Preload all />
            </Canvas>
          </div>
        )}

        <div className="relative z-10">
          <Header useMotion={false} {...config.sections.tech} />

          <p className="text-slate-300/80 mt-2 max-w-2xl text-sm leading-relaxed font-light">
            {config.sections.tech.content}
          </p>

          {/* Clumped Tech Clusters */}
          <div className="mt-8 sm:mt-10 flex flex-col gap-8 sm:gap-10">
            {techClusters.map((cluster, cIndex) => (
              <div key={cluster.clusterTitle} className="flex flex-col gap-3 sm:gap-4">
                {/* Symmetrical Centered Cluster Label */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-800" />
                  <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-400/20 shadow-sm">
                    {cluster.clusterTitle}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800" />
                </div>

                {/* Free-Floating 3D Gold Balls */}
                <div className="flex flex-row flex-wrap items-center justify-center gap-5 sm:gap-10 py-1 sm:py-2">
                  {cluster.items.map((technology, index) => {
                    const isActive = activeTech?.name === technology.name;
                    const seed = cIndex * 4 + index;

                    return (
                      <TechnologyItem
                        key={technology.name}
                        technology={technology}
                        isActive={isActive}
                        seed={seed}
                        isMobile={isMobile}
                        onToggle={handleTechToggle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
