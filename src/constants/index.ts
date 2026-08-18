import type { TNavLink } from "../types";

import { services } from "./services";
import { technologies, techClusters } from "./technologies";
import { projects, projectCategories } from "./projects";
import { experiences } from "./experiences";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "Voyage",
  },
  {
    id: "tech",
    title: "Arsenal",
  },
  {
    id: "work",
    title: "Heists",
  },
  {
    id: "contact",
    title: "Hail Captain",
  },
];

export { services, technologies, techClusters, projects, projectCategories, experiences };
