import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Lenis from "lenis";
import { ArrowUp } from "lucide-react";

import {
  AboutSection,
  HeroSection,
  Navbar,
  TechnologiesSection,
  ProjectsSection,
} from "./components";
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

    // High-performance snappy smooth scroll
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-slate-950 text-slate-100 relative z-0 selection:bg-amber-500 selection:text-slate-950 min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section with 3D Ship in Bottle (Full-Screen Flight) */}
        <HeroSection />

        {/* About / Manifesto Section */}
        <AboutSection />

        {/* Arsenal / Technologies Section (3D Looking-Around Tech Balls + Hover Info) */}
        <TechnologiesSection />

        {/* Projects Showcase */}
        <ProjectsSection />

        {/* Contact & 3D Map Section */}
        <div className="relative z-0">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>

          {/* Optimized Cosmic Starfield */}
          <Suspense fallback={null}>
            <StarsBackgroundCanvas />
          </Suspense>
        </div>

        {/* Clean Classy Footer */}
        <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-8 px-6 sm:px-16 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl border border-amber-400/30 bg-amber-500/10 p-1.5 flex items-center justify-center">
                <img src="/logo.webp" alt="logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-pirata text-lg text-white">Cap'n J's Treasure Map</span>
                <span className="text-[11px] text-slate-400">
                  © {new Date().getFullYear()} • Personal Portfolio
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a
                href={config.html.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <GithubIcon size={14} /> GitHub
              </a>
              <a
                href={config.html.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon size={14} /> Instagram
              </a>
              
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-300 hover:border-slate-600 hover:text-white transition-all"
              >
                <ArrowUp size={12} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
