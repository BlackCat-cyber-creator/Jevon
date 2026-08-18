import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";

import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";
import { GithubIcon } from "../atoms/Icons";

const ProjectCard: React.FC<{
  index: number;
  isMobile: boolean;
  project: TProject;
}> = ({ index, isMobile, project }) => {
  const { name, description, tags, image, websiteLink, githubLink, highlights, featured } = project;

  const cardContent = (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-600 hover:bg-slate-900/90 hover:shadow-xl">
      {/* Featured Pill */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-0.5 text-[10px] font-mono font-semibold text-amber-300 backdrop-blur-md">
          Featured
        </div>
      )}

      {/* Image Preview Container */}
      <div>
        <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Action Links */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label="View source on GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:border-slate-400 hover:text-white transition-all"
              >
                <GithubIcon size={14} />
              </a>
            )}

            {websiteLink && (
              <a
                href={websiteLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Live Demo"
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            {name}
          </h3>
          <p className="text-slate-300/80 mt-2 text-sm leading-relaxed font-light">
            {description}
          </p>

          {/* Key highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mt-3 space-y-1">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-light">
                  <CheckCircle2 size={12} className="text-amber-400 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Tags */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag.name} className={`text-xs font-mono ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <div className="w-full sm:w-[calc(50%-14px)] min-w-[280px]">{cardContent}</div>
  ) : (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.6)}
      className="w-full sm:w-[calc(50%-14px)] min-w-[280px]"
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1.01}
        transitionSpeed={600}
        className="h-full"
      >
        {cardContent}
      </Tilt>
    </motion.div>
  );
};

const ProjectsSection = () => {
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
      <Header useMotion={!isMobile} {...config.sections.works} />

      <p className="text-slate-300 mt-3 max-w-3xl text-base leading-relaxed font-light">
        {config.sections.works.content}
      </p>

      {/* Projects Grid */}
      <div className="mt-12 flex flex-wrap gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${project.name}`}
            index={index}
            project={project}
            isMobile={isMobile}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(ProjectsSection, "work");
