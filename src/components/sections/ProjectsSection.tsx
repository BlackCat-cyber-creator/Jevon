import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number; isMobile: boolean } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  isMobile,
  websiteLink, // Add websiteLink to props
  favicon,
}) => {
  const cardContent = (
    <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px]">
      <div className="relative h-[230px] w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-2xl object-cover"
        />
        <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
          {/* Website link */}
          {websiteLink && (
          <div
              onClick={() => window.open(websiteLink, "_blank")}
            className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <img
                src={favicon}
                alt="website"
              className="h-1/2 w-1/2 object-contain"
            />
          </div>
          )}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-[24px] font-bold text-white">{name}</h3>
        <p className="text-secondary mt-2 text-[14px]">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );

  return isMobile ? (
    <div>{cardContent}</div>
  ) : (
    <motion.div variants={fadeIn("up", "tween", index * 0.5, 0.75)}>
      <Tilt
        glareEnable={!isMobile} /* Conditionally disable glare on mobile */
        tiltEnable={!isMobile} /* Conditionally disable tilt on mobile */
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
      >
        {cardContent}
      </Tilt>
    </motion.div>
  );
};

const ProjectsSection = () => {
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
    <>
      <Header useMotion={!isMobile} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
          initial={isMobile ? false : "hidden"} // Disable initial animation on mobile
          animate={isMobile ? "visible" : "show"} // Ensure content is visible on mobile
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(ProjectsSection, "work");
