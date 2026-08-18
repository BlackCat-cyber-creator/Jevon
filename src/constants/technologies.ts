import type { TTechnology } from "../types";

import docker from "../assets/tech/docker.png";
import figma from "../assets/tech/figma.png";
import git from "../assets/tech/git.png";
import mongodb from "../assets/tech/mongodb.png";
import nodejs from "../assets/tech/nodejs.png";
import reactjs from "../assets/tech/reactjs.png";
import redux from "../assets/tech/redux.png";
import tailwind from "../assets/tech/tailwind.png";
import typescript from "../assets/tech/typescript.png";
import threejs from "../assets/tech/threejs.png";

export interface ITechCluster {
  clusterTitle: string;
  items: TTechnology[];
}

export const techClusters: ITechCluster[] = [
  {
    clusterTitle: "3D & Creative Engineering",
    items: [
      {
        name: "Three JS / R3F",
        icon: threejs,
        category: "creative",
        level: "Advanced",
        description: "3D spatial scenes, WebGL shaders, glTF model kinematics, and lighting systems.",
      },
      {
        name: "Figma",
        icon: figma,
        category: "creative",
        level: "Advanced",
        description: "High-fidelity spatial UI/UX, interactive design systems, and design tokens.",
      },
    ],
  },
  {
    clusterTitle: "Frontend Architecture",
    items: [
      {
        name: "TypeScript",
        icon: typescript,
        category: "frontend",
        level: "Expert",
        description: "Strict typing, complex generics, and scalable enterprise architecture.",
      },
      {
        name: "React JS",
        icon: reactjs,
        category: "frontend",
        level: "Expert",
        description: "Concurrent rendering, custom hooks, and high-performance reactive UI patterns.",
      },
      {
        name: "Tailwind CSS",
        icon: tailwind,
        category: "frontend",
        level: "Expert",
        description: "Modular design systems, fluid responsive layouts, and modern dark-mode styling.",
      },
      {
        name: "Redux Toolkit",
        icon: redux,
        category: "frontend",
        level: "Advanced",
        description: "Predictable centralized state management, RTK Query, and cache synchronization.",
      },
    ],
  },
  {
    clusterTitle: "Backend & Systems",
    items: [
      {
        name: "Node JS",
        icon: nodejs,
        category: "backend",
        level: "Advanced",
        description: "Event-driven asynchronous services, RESTful APIs, and scalable server architecture.",
      },
      {
        name: "MongoDB",
        icon: mongodb,
        category: "database",
        level: "Advanced",
        description: "Flexible document schemas, aggregation pipelines, and high-availability databases.",
      },
    ],
  },
  {
    clusterTitle: "DevOps & Cloud",
    items: [
      {
        name: "Docker",
        icon: docker,
        category: "devops",
        level: "Intermediate",
        description: "Containerized environments, reproducible builds, and multi-service orchestration.",
      },
      {
        name: "Git & GitHub",
        icon: git,
        category: "devops",
        level: "Expert",
        description: "Git flow branching, CI/CD automated pipelines, and collaborative version control.",
      },
    ],
  },
];

export const technologies: TTechnology[] = techClusters.flatMap((c) => c.items);