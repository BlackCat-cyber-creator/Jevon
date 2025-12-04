import type {
  TProject,
} from "../types";

import aidoc from "../assets/aidoc.png";
import pertamina from "../assets/Pertamina.png";
import jobit from "../assets/jobit.png";
import tripguide from "../assets/tripguide.png";

const projects: TProject[] = [
  {
    name: "Pertamina Booking",
    description:
      "A comprehensive fuel booking web application with 3 roles: admin, staff, and driver that allows drivers to refuel efficiently and conveniently to solve traffic problems in Indonesia.",
    tags: [ 
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: pertamina,

    websiteLink: "https://studio--studio-1002881994-2b7ff.us-central1.hosted.app/",
    favicon: "https://studio--studio-1002881994-2b7ff.us-central1.hosted.app/favicon.ico",
  },
  {
    name: "AIDOC",
    description:
      "web application designed to assist users in understanding potential medical diagnoses based on entered symptoms. It leverages AI to provide educational information.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: aidoc,

    websiteLink: "https://studio--aidoc-ze7io.us-central1.hosted.app/",
    favicon: "https://studio--aidoc-ze7io.us-central1.hosted.app/favicon.ico",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    websiteLink: "https://job-it-clone-chi.vercel.app/",
    favicon: "https://www.google.com/s2/favicons?domain=job-it-clone-chi.vercel.app",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    websiteLink: "https://trip-guide-nu.vercel.app/",
    favicon: "https://www.google.com/s2/favicons?domain=trip-guide-nu.vercel.app",
  },
];

export { projects }; 