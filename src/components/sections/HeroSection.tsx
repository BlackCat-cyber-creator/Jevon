import { Suspense, lazy, useState, useEffect } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

import { config } from "../../constants/config";
import { styles } from "../../constants/styles";

const ShipInBottleCanvas = lazy(() => import("../canvas/ShipInBottleCanvas"));

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter rotation effect
  useEffect(() => {
    const titles = config.hero.titles;
    const currentTitle = titles[currentTitleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentTitle.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-slate-950">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          className="w-full h-full object-cover opacity-25"
          src="/herobg.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* Content Container (Left side) */}
      <div
        className={`absolute inset-0 top-[120px] sm:top-[140px] mx-auto max-w-7xl ${styles.paddingX} flex flex-col items-start gap-5 z-20 pointer-events-none`}
      >
        <div className="pointer-events-auto max-w-2xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Hi, I'm <span className="font-pirata text-5xl sm:text-7xl lg:text-8xl gold-gradient-text tracking-wide">{config.hero.name}</span>
          </h1>
          
          {/* Typewriter Subtitle */}
          <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-300 min-h-[40px] mt-2">
            <ChevronRight size={22} className="text-amber-400 flex-shrink-0" />
            <span className="font-mono">{displayedText}</span>
            <span className="inline-block w-2.5 h-6 bg-cyan-400 animate-pulse" />
          </div>

          {/* Narrative Tagline */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 font-light max-w-xl">
            {config.hero.tagline}
          </p>
        </div>
      </div>

      {/* Full-Screen 3D Ship in Bottle Canvas */}
      <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
        <Suspense fallback={null}>
          <ShipInBottleCanvas />
        </Suspense>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-8 w-full flex justify-center items-center z-20 pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors group"
        >
          <span className="tracking-wider uppercase text-[10px]">Explore Voyage</span>
          <ArrowDown size={14} className="text-amber-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
