import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, MapPin } from "lucide-react";

import { PirateMapCanvas } from "../canvas";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.html.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy text to clipboard", err);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      id="contact"
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span">&nbsp;</span>

      <Header useMotion={true} {...config.sections.contact} />
      <p className="text-slate-300/80 mt-2.5 max-w-2xl text-sm leading-relaxed font-light">
        {config.sections.contact.content}
      </p>

      {/* Stacked Layout: 3D Map above, Message in a Bottle directly under */}
      <div className="mt-10 flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

        {/* 3D Pirate Map */}
        <motion.div
          variants={fadeIn("up", "spring", 0.15, 0.7)}
          className="w-full h-[260px] sm:h-[300px] relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 shadow-panel"
        >
          <PirateMapCanvas />
          {/* Location overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/80 px-3 py-2 backdrop-blur-sm">
            <MapPin size={13} className="text-amber-400" />
            <span className="text-xs font-mono text-slate-300">{config.html.location}</span>
          </div>
        </motion.div>

        {/* Message in a Bottle Terminal (Under the Map) */}
        <motion.div
          variants={fadeIn("up", "spring", 0.25, 0.7)}
          className="w-full"
        >
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-panel">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-crimson-privateer/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <span className="ml-2 text-[11px] font-mono text-slate-400">message_in_a_bottle.dispatch</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-6 flex flex-col gap-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                // Primary Dispatch Channel
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3">
                <Mail size={16} className="text-amber-400 flex-shrink-0" />
                <span className="flex-1 text-sm font-mono text-slate-200 truncate">
                  {config.html.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? "Email copied!" : "Copy email address"}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all flex-shrink-0 ${
                    copied
                      ? "bg-emerald-500/20 border border-emerald-400/30 text-emerald-300"
                      : "bg-amber-500/15 border border-amber-400/25 text-amber-300 hover:bg-amber-500/25"
                  }`}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
