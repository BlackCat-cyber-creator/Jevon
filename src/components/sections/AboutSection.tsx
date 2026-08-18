import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TService } from "../../types";

interface IServiceCardProps extends TService {
  index: number;
}

const ServiceCard: React.FC<IServiceCardProps> = ({
  index,
  title,
  subtitle,
  description,
  skills,
  icon,
}) => (
  <Tilt
    tiltMaxAngleX={15}
    tiltMaxAngleY={15}
    scale={1.02}
    transitionSpeed={800}
    className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-18px)] flex-1 min-w-[260px]"
  >
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group relative h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-600 hover:bg-slate-900/90 flex flex-col justify-between"
    >
      {/* Top Card Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800 p-2.5 group-hover:scale-110 transition-transform duration-300">
            <img src={icon} alt={title} className="h-full w-full object-contain" />
          </div>
          <span className="font-mono text-xs text-amber-400/80 border border-amber-400/20 bg-amber-500/5 px-2.5 py-1 rounded-full">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-sm text-slate-300/85 mt-3 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>

      {/* Skills Badges */}
      {skills && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-mono text-slate-300 bg-slate-800/60 border border-slate-700/60 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  </Tilt>
);

const AboutSection = () => {
  return (
    <>
      {/* Section Header */}
      <div className="flex flex-col">
        <Header useMotion={true} {...config.sections.about} />
        
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-slate-300 max-w-3xl text-base sm:text-lg leading-relaxed font-light"
        >
          {config.sections.about.content}
        </motion.p>
      </div>

      {/* Domain Cards Grid */}
      <div className="mt-12 flex flex-wrap gap-6 justify-between">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(AboutSection, "about");
