import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle2, X } from "lucide-react";

import { projects } from "../../constants";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { styles } from "../../constants/styles";
import type { TProject } from "../../types";
import { GithubIcon } from "../atoms/Icons";

// Modal detail inspector
const ProjectModal: React.FC<{ project: TProject; onClose: () => void }> = ({ project, onClose }) => {
  const { name, description, tags, image, websiteLink, githubLink, highlights } = project;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-48 sm:h-52 w-full bg-slate-950 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            >
              <X size={15} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-slate-300/80 text-sm leading-relaxed font-light">{description}</p>

            {/* Mission highlights */}
            {highlights && highlights.length > 0 && (
              <div className="mt-5">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400 mb-3">
                  Mission Briefing
                </p>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-light">
                      <CheckCircle2 size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag.name} className={`text-xs font-mono ${tag.color}`}>
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-3">
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all">
                  <GithubIcon size={13} /> Source Code
                </a>
              )}
              {websiteLink && (
                <a href={websiteLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-all">
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Compact Project Card
const ProjectCard: React.FC<{
  project: TProject;
  onOpen: () => void;
}> = ({ project, onOpen }) => {
  const { name, description, tags, image, websiteLink, githubLink } = project;

  return (
    <motion.div
      layout
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:shadow-gold-glow cursor-pointer"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      <div>
        {/* Compact image container */}
        <div className="relative h-[140px] sm:h-[150px] w-full overflow-hidden bg-slate-950">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

          {/* Quick action links on hover */}
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noreferrer"
                aria-label="Source code"
                onClick={(e) => e.stopPropagation()}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-900/90 text-slate-300 hover:border-slate-400 hover:text-white transition-all">
                <GithubIcon size={12} />
              </a>
            )}
            {websiteLink && (
              <a href={websiteLink} target="_blank" rel="noreferrer"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 rounded-md bg-amber-500 hover:bg-amber-400 px-2.5 py-1 text-[11px] font-semibold text-slate-950 transition-all">
                <span>Live</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-slate-300/75 mt-1.5 text-xs leading-relaxed font-light line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Tags footer */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag.name} className={`text-[10px] font-mono ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="text-[10px] font-mono text-slate-500">+{tags.length - 2}</span>
          )}
        </div>
        <span className="text-[10px] font-mono text-slate-500 group-hover:text-amber-400/70 transition-colors">
          Details →
        </span>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  return (
    <>
      <section
        id="work"
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
      >
        <span className="hash-span">&nbsp;</span>

        <Header useMotion={true} {...config.sections.works} />
        <p className="text-slate-300/80 mt-2 max-w-2xl text-sm leading-relaxed font-light">
          {config.sections.works.content}
        </p>

        {/* Sleek, compact 4-card responsive grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Modal portal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsSection;
