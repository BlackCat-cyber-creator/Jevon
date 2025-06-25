import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Lenis from 'lenis';

import {
  About,
  // Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  // StarsCanvas,
} from "./components";
import { useEffect } from "react"; // Removed useRef as touchStartY is no longer needed
import { config } from "./constants/config";

const Contact = lazy(() => import("./components/sections/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  // Removed touchStartY as it's no longer needed with Lenis
  // const touchStartY = useRef(0);

  useEffect(() => {
    // Scroll to the top of the page on component mount/refresh
    window.scrollTo(0, 0);

    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.075, // Adjust this value for overall scroll smoothness/speed (lower = smoother/slower)
      wheelMultiplier: 0.6, // Adjust this for mouse wheel sensitivity (lower = slower response)
      touchMultiplier: 0.6, // Adjust this for touch scroll sensitivity (lower = slower response)
      autoRaf: true, // Automatically run requestAnimationFrame loop
    });

    // Optional: Log scroll events (can be removed once satisfied)
    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });

    // Cleanup: destroy lenis instance when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Suspense fallback={<div>Loading Contact...</div>}>
            <Contact />
          </Suspense>
          <Suspense fallback={<div>Loading Stars...</div>}>
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
