import type {
  TService,
} from "../types";

import web from "../assets/web.png";
import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";

const services: TService[] = [
  {
    title: "Frontend UI&UX",
    icon: web,
  },
  {
    title: "Backend API&Server",
    icon: mobile,
  },
  {
    title: "Database Data&Storage",
    icon: backend,
  },
  {
    title: "DevOps Infra&Operations",
    icon: creator,
  },
];

export { services }; 