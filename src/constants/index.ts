import type {
  TNavLink,
} from "../types";

import { services } from "./services";
import { technologies } from "./technologies";
import { projects } from "./projects";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "A Seadog's Tale",
  },
  {
    id: "work",
    title: "My Booty",
  },
  {
    id: "contact",
    title: "Hail Captain!",
  },
];

export { services, technologies, projects };
