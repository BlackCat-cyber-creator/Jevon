import type { TProject } from "../types";

import aidoc from "../assets/aidoc.png";
import pertamina from "../assets/Pertamina.png";
import jobit from "../assets/jobit.png";
import tripguide from "../assets/tripguide.png";

export const projectCategories = [
  { id: "all", label: "All Heists" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI & Healthcare" },
  { id: "web", label: "Web Applications" },
] as const;

export const projects: TProject[] = [
  {
    name: "Pertamina Logistics & Fuel Engine",
    description:
      "A comprehensive commercial fuel allocation and booking platform featuring triple-role orchestration (Admin, Staff, Fleet Driver) to solve depot congestion and streamline logistics across Indonesia.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Firebase", color: "green-text-gradient" },
      { name: "Tailwind", color: "pink-text-gradient" },
      { name: "CloudAuth", color: "orange-text-gradient" },
    ],
    image: pertamina,
    category: "fullstack",
    featured: true,
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
      "AI-powered medical assessment client designed to evaluate user symptoms against large-scale clinical datasets to deliver instant educational health triage insights.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "AI/LLM", color: "green-text-gradient" },
      { name: "FastAPI", color: "pink-text-gradient" },
      { name: "Tailwind", color: "orange-text-gradient" },
    ],
    image: aidoc,
    category: "ai",
    featured: true,
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
      "Modern job portal and career discovery web application enabling tech professionals to filter openings by geolocation, verified salary brackets, and tech stack requirements.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "REST API", color: "green-text-gradient" },
      { name: "SCSS", color: "pink-text-gradient" },
      { name: "RapidAPI", color: "orange-text-gradient" },
    ],
    image: jobit,
    category: "web",
    featured: false,
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
      "Comprehensive travel exploration and booking platform allowing voyagers to search flight routes, accommodations, and curated local hidden gems around the world.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Supabase", color: "green-text-gradient" },
      { name: "CSS Modules", color: "pink-text-gradient" },
      { name: "Vercel", color: "orange-text-gradient" },
    ],
    image: tripguide,
    category: "fullstack",
    featured: false,
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