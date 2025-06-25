import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

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
import { useEffect, useRef } from "react";
import { config } from "./constants/config";

const Contact = lazy(() => import("./components/sections/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  const touchStartY = useRef(0);

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }

    // Function to handle slow scrolling for wheel events (desktop)
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // Prevent default scroll behavior

      const scrollAmount = event.deltaY * 0.17; // Adjust this value to control scroll speed
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    };

    // Functions to handle slow scrolling for touch events (mobile)
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      const scrollAmount = deltaY * 0.5; // Adjust this value to control touch scroll speed

      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      touchStartY.current = currentY; // Update startY for continuous scrolling
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup: remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

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
