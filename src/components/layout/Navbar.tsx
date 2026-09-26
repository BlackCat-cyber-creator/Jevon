import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { config } from "../../constants/config";
import { GithubIcon, InstagramIcon } from "../atoms/Icons";

const Navbar = () => {
  const [active, setActive] = useState<string | null>("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    // IntersectionObserver for zero-cost section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -50% 0px", threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-50 flex w-full items-center py-4 sm:py-5 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 sm:gap-3 group max-w-[75%] sm:max-w-none"
          aria-label="Back to top"
        >
          <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-400/30 p-1.5 sm:p-2 shadow-sm group-hover:border-amber-400 group-hover:shadow-gold transition-all duration-300 flex-shrink-0">
            <img src="/logo.webp" alt="Cap'n J logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-pirata text-xl sm:text-2xl tracking-wide text-white group-hover:text-amber-300 transition-colors truncate">
            Cap'n J's Treasure Map
          </span>
        </a>

        {/* Desktop Navigation & Social Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {navLinks.map((nav) => {
              const isActive = active === nav.id;
              return (
                <li
                  key={nav.id}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-amber-300 font-semibold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <a href={`#${nav.id}`} className="py-1 block">
                    {nav.title}
                  </a>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-amber-400 rounded-full" />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={config.html.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-amber-400/40 hover:text-amber-300 transition-all"
            >
              <GithubIcon size={16} />
            </a>

            <a
              href={config.html.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-pink-500/40 hover:text-pink-400 transition-all"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle navigation menu"
            aria-expanded={toggle}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/90 text-white hover:border-amber-400/30 transition-colors"
          >
            {toggle ? <X size={20} /> : <Menu size={20} />}
          </button>

          {toggle && (
            <>
              {/* Dim Backdrop Overlay */}
              <div
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                onClick={() => setToggle(false)}
              />
              {/* Solid High-Contrast Mobile Drawer */}
              <div className="fixed inset-x-4 top-16 sm:top-20 z-50 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-5 flex flex-col gap-3">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      onClick={() => setToggle(false)}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
                        active === nav.id
                          ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-400/25"
                          : "text-slate-200 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <a href={`#${nav.id}`} className="block">
                        {nav.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <a
                    href={config.html.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a
                    href={config.html.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 flex items-center gap-1.5 hover:text-pink-300 transition-colors"
                  >
                    <InstagramIcon size={14} /> Instagram
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
