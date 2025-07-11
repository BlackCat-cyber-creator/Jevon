import type {
  TNavLink,
} from "../types";

import { services } from "./services";
import { technologies } from "./technologies";
import { experiences } from "./experiences";
import { testimonials } from "./testimonials";
import { projects } from "./projects";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "A Seadog's Tale",
  },
  {
    id: "work",
    title: "My Plunders",
  },
  {
    id: "contact",
    title: "Hail Me!",
  },
];

export { services, technologies, experiences, testimonials, projects };
