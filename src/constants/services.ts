import type { TService } from "../types";

import web from "../assets/web.png";
import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";

const services: TService[] = [
  {
    title: "Frontend Architecture",
    icon: web,
    subtitle: "Fluid UI / UX & 3D Web",
    description: "Building responsive, cinematic, and accessible interfaces with React, Next.js, Three.js/R3F, and Tailwind CSS.",
    skills: ["React 18+", "Next.js", "TypeScript", "Three.js / R3F", "Framer Motion", "Tailwind CSS"],
    accentColor: "from-amber-500/20 to-yellow-500/10",
  },
  {
    title: "Backend & Systems",
    icon: mobile,
    subtitle: "High-Throughput APIs",
    description: "Designing robust REST and GraphQL APIs, authentication flows, microservices, and distributed architecture.",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "Python", "JWT / OAuth"],
    accentColor: "from-cyan-500/20 to-blue-500/10",
  },
  {
    title: "Database Engineering",
    icon: backend,
    subtitle: "Relational & NoSQL",
    description: "Structuring scalable database schemas, indexing pipelines, caching layers, and real-time synchronization.",
    skills: ["PostgreSQL", "MongoDB", "Firebase / Firestore", "Supabase", "Redis", "Prisma"],
    accentColor: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "DevOps & Cloud",
    icon: creator,
    subtitle: "CI/CD & Containerization",
    description: "Automating deployment pipelines, containerizing services with Docker, and orchestrating cloud infra.",
    skills: ["Docker", "Git & GitHub Actions", "Vercel / Cloudflare", "Linux", "GCP / Firebase"],
    accentColor: "from-purple-500/20 to-indigo-500/10",
  },
];

export { services };