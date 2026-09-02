import type { TMotion } from "../types";
import type { Variants } from "framer-motion";

export const textVariant = (): Variants => ({
  hidden: { y: -12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.5, ease: "easeOut" },
  },
});

export const fadeIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
): Variants => ({
  hidden: {
    x: direction === "left" ? 16 : direction === "right" ? -16 : 0,
    y: direction === "up" ? 16 : direction === "down" ? -16 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: type === "spring" ? "spring" : "tween", delay, duration, ease: "easeOut" },
  },
});
