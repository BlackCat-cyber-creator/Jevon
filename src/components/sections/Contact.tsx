import { useState, useEffect } from "react";

import { PirateMapCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import UserProfileCard from "../UserProfileCard";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <>
      {/* Consistent Section Header */}
      <Header useMotion={!isMobile} {...config.sections.contact} />

      <p className="text-slate-300 mt-2.5 max-w-3xl text-base leading-relaxed font-light">
        {config.sections.contact.content}
      </p>

      {/* 3D Pirate Map (Proportionally centered with zero clipping) */}
      <div className="h-[220px] sm:h-[260px] w-full max-w-2xl mx-auto relative z-20 flex items-center justify-center -my-2 sm:-my-3">
        <PirateMapCanvas />
      </div>

      {/* Holographic User Profile Card */}
      <div className="w-full flex justify-center relative z-10 mt-1 sm:mt-2">
        <UserProfileCard
          name="Jevon"
          title="Captain"
          handle="jevon.n.shield"
          status="Online"
          contactText="Contact"
          avatarUrl="/jevon.webp"
          miniAvatarUrl="/jevon.webp"
          iconUrl="/insta.webp"
          grainUrl="/logo.webp"
          showUserInfo={true}
          enableTilt={true}
        />
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
