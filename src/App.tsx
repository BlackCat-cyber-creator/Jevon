import { Suspense, lazy, useEffect } from "react";
import { Anchor } from "lucide-react";

import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import TechnologiesSection from "./components/sections/TechnologiesSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { config } from "./constants/config";
import { GithubIcon, InstagramIcon } from "./components/atoms/Icons";

const Contact = lazy(() => import("./components/sections/Contact"));
const StarsBackgroundCanvas = lazy(() => import("./components/canvas/StarsBackground"));

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 relative z-0 selection:bg-amber-500 selection:text-slate-950 min-h-screen">
      <Navbar />

      {/* Hero Deck */}
      <HeroSection />

      {/* Manifesto (About) — Profile Card + Engineering Pillars */}
      <AboutSection />

      {/* Arsenal (Technologies) — 3D Cannonball Orbs */}
      <TechnologiesSection />

      {/* Treasures (Projects) — Loot Cards */}
      <ProjectsSection />

      {/* Captain's Quarters (Contact) + Stars Background */}
      <div className="relative z-0">
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <StarsBackgroundCanvas />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-amber-500/10 bg-slate-950/95 py-7 px-6 sm:px-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-amber-400/30 bg-amber-500/10 p-1.5 flex items-center justify-center">
              <img src="/logo.webp" alt="Cap'n J logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-pirata text-lg text-white leading-tight">Cap'n J's Treasure Map</span>
              <span className="text-[11px] text-slate-500 font-mono">
                © {new Date().getFullYear()} {config.html.fullName} • Personal Portfolio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <a href={config.html.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="hover:text-white transition-colors flex items-center gap-1.5">
              <GithubIcon size={14} /> GitHub
            </a>
            <a href={config.html.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <InstagramIcon size={14} /> Instagram
            </a>
            <button type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-amber-400/70 hover:border-amber-400/50 hover:text-amber-300 hover:bg-amber-500/10 transition-all">
              <Anchor size={11} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
