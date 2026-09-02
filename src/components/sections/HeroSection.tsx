import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

import { config } from "../../constants/config";
import { styles } from "../../constants/styles";

const ShipInBottleCanvas = lazy(() => import("../canvas/ShipInBottleCanvas"));

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Pause video when scrolled out of view to save GPU/CPU video decoder cycles
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter rotation
  useEffect(() => {
    const titles = config.hero.titles;
    const currentTitle = titles[currentTitleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
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
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen mx-auto overflow-hidden bg-slate-950"
      aria-label="Hero section"
    >
      {/* Background video with balanced atmospheric overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-28"
          src="/herobg.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        {/* Multi-layer cinematic gradient with balanced tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
      </div>

      {/* Ambient gold glow orb — top left */}
      <div className="absolute top-1/4 left-8 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none z-0" aria-hidden="true" />

      {/* Content — left side */}
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-col justify-center items-start z-20 pointer-events-none`}
      >
        <div className="pointer-events-auto max-w-xl lg:max-w-2xl">
          {/* Name heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Hi, I'm{" "}
            <span className="font-pirata text-5xl sm:text-7xl lg:text-8xl gold-gradient-text tracking-wide">
              {config.hero.name}
            </span>
          </h1>

          {/* Typewriter subtitle */}
          <div className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-300 min-h-[40px] mt-3">
            <ChevronRight size={22} className="text-amber-400 flex-shrink-0" />
            <span className="font-mono">{displayedText}</span>
            <span className="inline-block w-[2px] h-6 bg-cyan-400 animate-pulse ml-0.5" />
          </div>

          {/* Tagline */}
          <p className="text-slate-300/90 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 font-light max-w-lg">
            {config.hero.tagline}
          </p>
        </div>
      </div>

      {/* Full-screen 3D Ship in Bottle Canvas */}
      <div className="absolute inset-0 pointer-events-none md:pointer-events-auto z-10">
        <Suspense fallback={null}>
          <ShipInBottleCanvas />
        </Suspense>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-8 w-full flex justify-center items-center z-20 pointer-events-none">
        <a
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors group"
          aria-label="Scroll to about section"
        >
          <span className="tracking-widest uppercase text-[10px] font-mono">Explore Voyage</span>
          <ArrowDown size={14} className="text-amber-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
