import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { config } from "../../constants/config";
import { GithubIcon } from "../atoms/Icons";

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

    // Use IntersectionObserver for high-performance section highlighting without scroll lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
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
      className={`${
        styles.paddingX
      } fixed top-0 z-40 flex w-full items-center py-4 sm:py-5 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 group max-w-[75%] sm:max-w-none"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-slate-800 border border-amber-400/30 p-1.5 sm:p-2 shadow-sm group-hover:border-amber-400 transition-all duration-300 flex-shrink-0">
            <img src="/logo.webp" alt="logo" className="h-full w-full object-contain" />
          </div>

          <span className="font-pirata text-xl sm:text-2xl tracking-wide text-white group-hover:text-amber-300 transition-colors truncate">
            Cap'n J's Treasure Map
          </span>
        </Link>

        {/* Desktop Navigation Links & Contact Button */}
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

          <div className="flex items-center gap-3">
            <a
              href={config.html.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-600 hover:text-white transition-all"
            >
              <GithubIcon size={16} />
            </a>

            <a
              href="#contact"
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-all"
            >
              Hail Captain
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/90 text-white"
          >
            {toggle ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Drawer */}
          {toggle && (
            <div className="fixed inset-x-4 top-16 z-50 rounded-2xl border border-slate-800 bg-slate-950/95 p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    onClick={() => setToggle(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      active === nav.id
                        ? "bg-amber-500/15 text-amber-300 font-semibold"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <a href={`#${nav.id}`} className="block">
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <a
                  href={config.html.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 flex items-center gap-1.5"
                >
                  <GithubIcon size={14} /> GitHub Profile
                </a>

                <a
                  href="#contact"
                  onClick={() => setToggle(false)}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-slate-950"
                >
                  Hail Captain
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
