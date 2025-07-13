import { motion } from "framer-motion";

import { PirateMapCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import UserProfileCard from "../UserProfileCard";
import { useState, useEffect } from "react";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      {isMobile ? (
        <div className="xl:flex-1 flex flex-col items-center justify-center gap-10">
          <div className="h-[300px] md:h-[400px] xl:h-auto w-full flex items-center justify-center">
            <PirateMapCanvas />
          </div>
          <UserProfileCard
            name="Jevon"
            title="Captain"
            handle="jevon.n.shield"
            status="Online"
            contactText="Contact"
            avatarUrl="/jevon.png"
            miniAvatarUrl="/jevon.png"
            iconUrl="/insta.png"
            grainUrl="/logo.png"
            showUserInfo={true}
            enableTilt={true}
            className="mb-20"
          />
        </div>
      ) : (
      <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 flex flex-col items-center justify-center gap-10"
      >
        <div className="h-[300px] md:h-[400px] xl:h-auto w-full flex items-center justify-center">
            <PirateMapCanvas />
        </div>
        <UserProfileCard
          name="Jevon"
          title="Captain"
          handle="jevon.n.shield"
          status="Online"
          contactText="Contact"
          avatarUrl="/jevon.png"
          miniAvatarUrl="/jevon.png"
          iconUrl="/insta.png"
            grainUrl="/logo.png"
          showUserInfo={true}
          enableTilt={true}
          className="mb-20"
        />
      </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
