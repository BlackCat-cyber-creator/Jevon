import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../atoms/Icons";
import type { TProject } from "../../types";

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

export default ProjectCard;
