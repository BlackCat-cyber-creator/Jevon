import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle2, X } from "lucide-react";

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

export default ProjectModal;
