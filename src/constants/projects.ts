import type { TProject } from "../types";

import aidoc from "../assets/aidoc.png";
import pertamina from "../assets/Pertamina.png";
import jobit from "../assets/jobit.png";
import tripguide from "../assets/tripguide.png";

export const projects: TProject[] = [
  {
    name: "Pertamina Logistics & Fuel Engine",
    description:
      "A commercial fuel allocation and booking platform with multi-role orchestration (Admin, Staff, Fleet Driver) streamlining depot operations.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Firebase", color: "green-text-gradient" },
      { name: "Tailwind", color: "pink-text-gradient" },
      { name: "CloudAuth", color: "orange-text-gradient" },
    ],
    image: pertamina,
    category: "fullstack",
    websiteLink: "https://studio--studio-1002881994-2b7ff.us-central1.hosted.app/",
    githubLink: "https://github.com/BlackCat-cyber-creator",
    favicon: "https://studio--studio-1002881994-2b7ff.us-central1.hosted.app/favicon.ico",
    highlights: [
      "Role-based authentication architecture with granular security rules",
      "Real-time depot queue status and digital proof-of-refuel verification",
      "Comprehensive dashboard for fleet logs and transaction tracking",
    ],
  },
  {
    name: "AIDOC Diagnostic Intelligence",
    description:
      "AI-powered medical assessment client evaluating user symptoms against clinical datasets to deliver rapid health triage insights.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "AI/LLM", color: "green-text-gradient" },
      { name: "FastAPI", color: "pink-text-gradient" },
      { name: "Tailwind", color: "orange-text-gradient" },
    ],
    image: aidoc,
    category: "ai",
    websiteLink: "https://studio--aidoc-ze7io.us-central1.hosted.app/",
    githubLink: "https://github.com/BlackCat-cyber-creator",
    favicon: "https://studio--aidoc-ze7io.us-central1.hosted.app/favicon.ico",
    highlights: [
      "Interactive conversational symptom questionnaire engine",
      "Instant risk classification and recommended clinical next-steps",
      "End-to-end responsive dark-mode patient interface",
    ],
  },
  {
    name: "Job IT Career Discovery Engine",
    description:
      "Career discovery web application allowing developers to filter jobs by geolocation, verified salary brackets, and tech stacks.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "REST API", color: "green-text-gradient" },
      { name: "SCSS", color: "pink-text-gradient" },
      { name: "RapidAPI", color: "orange-text-gradient" },
    ],
    image: jobit,
    category: "web",
    websiteLink: "https://job-it-clone-chi.vercel.app/",
    githubLink: "https://github.com/BlackCat-cyber-creator",
    favicon: "https://www.google.com/s2/favicons?domain=job-it-clone-chi.vercel.app",
    highlights: [
      "Real-time job aggregation via global developer recruitment APIs",
      "Dynamic salary comparison graphs and contract filter toggles",
      "One-click application redirection with cached search preferences",
    ],
  },
  {
    name: "Trip Guide Global Voyager",
    description:
      "Travel exploration platform enabling voyagers to discover routes, accommodations, and curated local hidden gems worldwide.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Supabase", color: "green-text-gradient" },
      { name: "CSS Modules", color: "pink-text-gradient" },
      { name: "Vercel", color: "orange-text-gradient" },
    ],
    image: tripguide,
    category: "fullstack",
    websiteLink: "https://trip-guide-nu.vercel.app/",
    githubLink: "https://github.com/BlackCat-cyber-creator",
    favicon: "https://www.google.com/s2/favicons?domain=trip-guide-nu.vercel.app",
    highlights: [
      "Curated travel guides with interactive location bookmarks",
      "Seamless hotel and transport query comparison engine",
      "Server-side rendering for optimal SEO and rapid page loads",
    ],
  },
];