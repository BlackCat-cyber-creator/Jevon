import React from "react";
import { motion } from "framer-motion";
import { Compass, Calendar, MapPin, CheckCircle2 } from "lucide-react";

import { SectionWrapper } from "../../hoc";
import { experiences } from "../../constants/experiences";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { fadeIn } from "../../utils/motion";
import { soundEngine } from "../../utils/audio";
import { TExperience } from "../../types";

const ExperienceCard: React.FC<{ experience: TExperience; index: number }> = ({
  experience,
  index,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.25, 0.75)}
      onMouseEnter={() => soundEngine.playHover()}
      className="relative flex flex-col md:flex-row gap-6 p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
    >
      {/* Node Marker & Left Meta */}
      <div className="flex md:flex-col items-start justify-between md:justify-start gap-3 min-w-[220px]">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Compass size={18} />
          </div>
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
            VOYAGE #{experiences.length - index}
          </span>
        </div>

        <div className="flex flex-col gap-1 mt-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Calendar size={13} className="text-cyan-400" />
            <span>{experience.date}</span>
          </div>
          {experience.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-500" />
              <span>{experience.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {experience.title}
        </h3>
        <p className="text-sm font-mono text-cyan-400 mt-0.5">
          {experience.companyName}
        </p>

        {/* Achievement Points */}
        <ul className="mt-4 space-y-2.5">
          {experience.points.map((point, idx) => (
            <li key={`point-${idx}`} className="flex items-start gap-2.5 text-sm text-slate-300/90 leading-relaxed font-light">
              <CheckCircle2 size={16} className="text-amber-400/80 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Tags */}
        {experience.tags && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.experience} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-slate-300 mt-4 max-w-3xl text-base sm:text-lg leading-relaxed font-light"
      >
        {config.sections.experience.content}
      </motion.p>

      <div className="mt-14 flex flex-col gap-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(ExperienceSection, "experience");
