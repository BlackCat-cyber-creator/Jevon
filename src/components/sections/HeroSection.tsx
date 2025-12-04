import { Suspense, lazy } from "react";

import { styles } from "../../constants/styles";
import { config } from "../../constants/config";

const ShipInBottleCanvas = lazy(() => import("../canvas/ShipInBottleCanvas"));

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src="/herobg.webm"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      {/* Content container */}
      <div
        className={`absolute inset-0 top-[100px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#B8860B]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white font-pirata`}>
            Hi, I'm <span className="text-[#B8860B]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      <Suspense fallback={null}>
        <ShipInBottleCanvas />
      </Suspense>
    </section>
  );
};

export default HeroSection;
