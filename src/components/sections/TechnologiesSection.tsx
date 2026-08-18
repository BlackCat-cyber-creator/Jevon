import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

import { TechBallMesh } from "../canvas/TechBall";
import { SectionWrapper } from "../../hoc";
import { techClusters } from "../../constants/technologies";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TTechnology } from "../../types";

const TechnologiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [activeTech, setActiveTech] = useState<TTechnology | null>(null);

  const handleTechToggle = (tech: TTechnology) => {
    setActiveTech(activeTech?.name === tech.name ? null : tech);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* 1 Single Unified WebGL Canvas for all 3D Balls (Eliminates mobile WebGL context loss) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas
          eventSource={containerRef}
          dpr={[1, 1.2]}
          gl={{
            preserveDrawingBuffer: false,
            powerPreference: "high-performance",
            antialias: true,
          }}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>

      <div className="relative z-10">
        <Header useMotion={false} {...config.sections.tech} />

        <p className="text-slate-300 mt-3 max-w-3xl text-base leading-relaxed font-light">
          {config.sections.tech.content}
        </p>

        {/* Clumped Tech Clusters (Free-Floating 3D Gold Balls) */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-7 sm:gap-9">
          {techClusters.map((cluster, cIndex) => (
            <div key={cluster.clusterTitle} className="flex flex-col gap-2.5 sm:gap-3.5">
              {/* Subtle Cluster Label */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/20">
                  {cluster.clusterTitle}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
              </div>

              {/* Free-Floating 3D Gold Balls */}
              <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 py-1 sm:py-2">
                {cluster.items.map((technology, index) => {
                  const isActive = activeTech?.name === technology.name;
                  const seed = cIndex * 4 + index;

                  return (
                    <div
                      key={technology.name}
                      className="flex flex-col items-center justify-center relative cursor-pointer group select-none"
                      onClick={() => handleTechToggle(technology)}
                      onMouseEnter={() => setActiveTech(technology)}
                      onMouseLeave={() => setActiveTech(null)}
                    >
                      {/* Tooltip Card precisely centered directly above the tapped/hovered ball */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, x: "-50%", scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                            exit={{ opacity: 0, y: 6, x: "-50%", scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={{ left: "50%" }}
                            className="absolute bottom-full mb-2 w-56 sm:w-64 rounded-2xl border border-amber-400/40 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl z-50 pointer-events-none"
                          >
                            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                                  <img
                                    src={technology.icon}
                                    alt={technology.name}
                                    className="h-full w-full object-contain"
                                  />
                                </div>
                                <span className="font-bold text-xs sm:text-sm text-white">
                                  {technology.name}
                                </span>
                              </div>
                              {technology.level && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300">
                                  {technology.level}
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light">
                              {technology.description}
                            </p>

                            {/* Downward pointing golden arrow centered precisely to the ball */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-amber-400/50" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 3D Ball Viewport (Rendered through the single Canvas context) */}
                      <div className="h-20 w-20 sm:h-28 sm:w-28 flex items-center justify-center">
                        <View className="h-full w-full">
                          <Suspense fallback={null}>
                            <TechBallMesh imgUrl={technology.icon} seed={seed} />
                          </Suspense>
                        </View>
                      </div>

                      <span className="mt-1 text-[11px] sm:text-xs font-mono text-slate-400 group-hover:text-amber-300 text-center transition-colors">
                        {technology.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(TechnologiesSection, "tech");
