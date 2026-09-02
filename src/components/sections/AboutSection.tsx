import React from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";

import { services } from "../../constants";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";
import type { TService } from "../../types";
import UserProfileCard from "../UserProfileCard";

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
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.65)}
    className="group relative w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:bg-slate-900/90 hover:shadow-gold-glow flex flex-col justify-between"
    style={{
      transform: "perspective(1000px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }}
  >
    <div>
      {/* Accent number */}
      <div className="absolute top-4 right-4 font-mono text-xs font-bold text-amber-400/40 group-hover:text-amber-400/80 transition-colors">
        0{index + 1}
      </div>

      {/* Compact, elegantly proportioned icon */}
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-amber-400/20 p-2 mb-3.5 transition-all duration-300 group-hover:scale-105">
        <img src={icon} alt={title} className="h-6 w-6 sm:h-7 sm:w-7 object-contain" />
      </div>

      {/* Title + Subtitle (always clean left-aligned) */}
      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors text-left">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[11px] sm:text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider text-left">
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="text-xs sm:text-sm text-slate-300/80 mt-2.5 leading-relaxed font-light text-left">
          {description}
        </p>
      )}
    </div>

    {/* Skills */}
    {skills && (
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 justify-start">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-mono text-slate-300 bg-slate-800/60 border border-slate-700/60 px-2 py-0.5 rounded-md hover:border-amber-400/30 hover:text-amber-300 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const AboutSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      id="about"
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span">&nbsp;</span>

      {/* Two-column layout: Text (left) + Profile Card (right) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left — Section Header + Manifesto (always left-aligned as requested) */}
        <div className="flex-1 min-w-0 w-full text-left">
          <Header useMotion={true} {...config.sections.about} />

          {/* Gold drop-cap manifesto */}
          <motion.div
            variants={fadeIn("", "tween", 0.1, 0.9)}
            className="mt-5 max-w-2xl text-left"
          >
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light text-left">
              <span className="float-left font-pirata text-4xl sm:text-5xl text-amber-400 leading-[0.8] mr-2 mt-1">S</span>
              pecialized in architecting performant full-stack platforms, scalable microservices,
              and interactive 3D web experiences. Armed with{" "}
              <span className="text-cyan-300 font-medium">TypeScript</span>,{" "}
              <span className="text-cyan-300 font-medium">React</span>,{" "}
              <span className="text-cyan-300 font-medium">Next.js</span>,{" "}
              <span className="text-cyan-300 font-medium">Node.js</span>, and{" "}
              <span className="text-amber-300 font-medium">Three.js</span>, I navigate modern cloud
              ecosystems to ship polished, enterprise-ready software.
            </p>
          </motion.div>
        </div>

        {/* Right — Holographic Captain Profile Card (Centered in column on mobile) */}
        <motion.div
          variants={fadeIn("left", "spring", 0.25, 0.7)}
          className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto"
        >
          <Suspense fallback={null}>
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
          </Suspense>
        </motion.div>
      </div>

      {/* Engineering Pillars Grid */}
      <div className="mt-14 sm:mt-16">
        <motion.h3
          variants={fadeIn("up", "tween", 0.1, 0.7)}
          className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-400/80 mb-6 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/20" />
          Core Engineering Pillars
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/20" />
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
