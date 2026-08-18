import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { TechBallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { techClusters } from "../../constants/technologies";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TTechnology } from "../../types";

const TechnologiesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<TTechnology | null>(null);
  const [mobileSelectedTech, setMobileSelectedTech] = useState<TTechnology | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleItemClick = (tech: TTechnology) => {
    if (isMobile) {
      setMobileSelectedTech(mobileSelectedTech?.name === tech.name ? null : tech);
    }
  };

  return (
    <>
      <Header useMotion={!isMobile} {...config.sections.tech} />

      <p className="text-slate-300 mt-3 max-w-3xl text-base leading-relaxed font-light">
        {config.sections.tech.content}
      </p>

      {/* Clumped Tech Clusters (Free-Floating 3D Balls Grouped by Nature) */}
      <div
        onMouseMove={handleMouseMove}
        className="mt-10 sm:mt-12 flex flex-col gap-8 sm:gap-10 relative"
      >
        {techClusters.map((cluster, cIndex) => (
          <div key={cluster.clusterTitle} className="flex flex-col gap-3 sm:gap-4">
            {/* Subtle Cluster Label */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/20">
                {cluster.clusterTitle}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
            </div>

            {/* Free-Floating 3D Balls / Mobile Touch Icons */}
            <div className="flex flex-row flex-wrap items-center gap-6 sm:gap-10 py-1 sm:py-2">
              {cluster.items.map((technology, index) => (
                <div
                  className="flex flex-col items-center justify-center relative group cursor-pointer active:scale-95 transition-transform"
                  key={technology.name}
                  onClick={() => handleItemClick(technology)}
                  onMouseEnter={() => !isMobile && setHoveredTech(technology)}
                  onMouseLeave={() => !isMobile && setHoveredTech(null)}
                >
                  <div className="h-20 w-20 sm:h-32 sm:w-32 flex items-center justify-center">
                    {isMobile ? (
                      <div className="h-16 w-16 p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md hover:border-amber-400 transition-colors">
                        <img
                          src={technology.icon}
                          alt={technology.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <TechBallCanvas icon={technology.icon} seed={cIndex * 4 + index} />
                    )}
                  </div>

                  <span className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-mono text-slate-400 group-hover:text-amber-300 text-center transition-colors">
                    {technology.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Mobile Tap Description Card */}
        <AnimatePresence>
          {isMobile && mobileSelectedTech && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl border border-amber-400/40 bg-slate-950/95 p-4 shadow-xl backdrop-blur-xl mt-2 relative"
            >
              <button
                type="button"
                onClick={() => setMobileSelectedTech(null)}
                className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                  <img src={mobileSelectedTech.icon} alt={mobileSelectedTech.name} className="h-full w-full object-contain" />
                </div>
                <span className="font-bold text-sm text-white">{mobileSelectedTech.name}</span>
                {mobileSelectedTech.level && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300">
                    {mobileSelectedTech.level}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {mobileSelectedTech.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Minimal Clean Floating Tooltip Card on Hover */}
        <AnimatePresence>
          {hoveredTech && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                left: mousePos.x + 16,
                top: mousePos.y + 16,
                pointerEvents: "none",
                zIndex: 9999,
              }}
              className="w-64 rounded-2xl border border-amber-400/40 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                    <img src={hoveredTech.icon} alt={hoveredTech.name} className="h-full w-full object-contain" />
                  </div>
                  <span className="font-bold text-sm text-white">{hoveredTech.name}</span>
                </div>
                {hoveredTech.level && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300">
                    {hoveredTech.level}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {hoveredTech.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SectionWrapper(TechnologiesSection, "tech");
