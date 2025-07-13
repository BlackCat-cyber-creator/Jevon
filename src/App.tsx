import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Lenis from 'lenis';

import {
  AboutSection,
  // Contact,
  ExperienceSection,
  TestimonialsSection,
  HeroSection,
  Navbar,
  TechnologiesSection,
  ProjectsSection,
  // StarsCanvas,
} from "./components";
import { useEffect, useState } from "react"; // Removed useRef as touchStartY is no longer needed
import { config } from "./constants/config";

const Contact = lazy(() => import("./components/sections/Contact"));
const StarsBackgroundCanvas = lazy(() => import("./components/canvas/StarsBackground"));

const App = () => {
  // Removed touchStartY as it's no longer needed with Lenis
  // const touchStartY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page on component mount/refresh
    window.scrollTo(0, 0);

    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }

    // Add a media query listener for mobile devices
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.06, // Adjust this value for overall scroll smoothness/speed (lower = smoother/slower)
      wheelMultiplier: 0.5, // Adjust this for mouse wheel sensitivity (lower = slower response)
      touchMultiplier: 0.5, // Adjust this for touch scroll sensitivity (lower = slower response)
      autoRaf: true, // Automatically run requestAnimationFrame loop
    });

    // Optional: Log scroll events (can be removed once satisfied)
    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });

    // Cleanup: destroy lenis instance and remove the listener when component unmounts
    return () => {
      lenis.destroy();
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div className="bg-cover bg-center bg-no-repeat">
          <Navbar />
          <HeroSection />
        </div>
        <AboutSection />
        <ExperienceSection />
        <TechnologiesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <div className="relative z-0">
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
          {!isMobile && (
            <Suspense fallback={null}>
              <StarsBackgroundCanvas />
            </Suspense>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
