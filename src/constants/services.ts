import type {
  TService,
} from "../types";

import web from "../assets/web.png";
import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";

const services: TService[] = [
  {
    title: "Frontend",
    icon: web,
  },
  {
    title: "Backend",
    icon: mobile,
  },
  {
    title: "Database",
    icon: backend,
  },
  {
    title: "DevOps",
    icon: creator,
  },
];

export { services }; 