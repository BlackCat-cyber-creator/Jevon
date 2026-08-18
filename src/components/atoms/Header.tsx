import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, Gem, Send, Sparkles } from "lucide-react";

import { styles } from "../../constants/styles";
import { textVariant } from "../../utils/motion";

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
  icon?: React.ReactNode;
}

const getSectionIcon = (subtitle: string) => {
  const lower = subtitle.toLowerCase();
  if (lower.includes("manifesto") || lower.includes("voyage") || lower.includes("seadog")) {
    return <Compass size={13} className="text-amber-400" />;
  }
  if (lower.includes("arsenal") || lower.includes("tech")) {
    return <Cpu size={13} className="text-amber-400" />;
  }
  if (lower.includes("heists") || lower.includes("booty") || lower.includes("treasures")) {
    return <Gem size={13} className="text-amber-400" />;
  }
  if (lower.includes("pigeon") || lower.includes("dispatch") || lower.includes("quarters")) {
    return <Send size={13} className="text-amber-400" />;
  }
  return <Sparkles size={13} className="text-amber-400" />;
};

export const Header: React.FC<IHeader> = ({ useMotion, p, h2, icon }) => {
  const renderedIcon = icon || getSectionIcon(p);

  const Content = () => (
    <div className="flex flex-col items-start gap-1">
      {/* Refined Section Badge */}
      {p && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-amber-300 backdrop-blur-md">
          {renderedIcon}
          <span className="uppercase tracking-wider">{p}</span>
        </div>
      )}

      {/* Head text with pirata font and gold gradient */}
      <h2 className={`${styles.sectionHeadText} font-pirata tracking-wide gold-gradient-text mt-2`}>
        {h2}
      </h2>
    </div>
  );

  return useMotion === true ? (
    <motion.div variants={textVariant()}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};
