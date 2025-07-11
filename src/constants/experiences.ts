import type {
  TExperience,
} from "../types";

import google from "../assets/company/google.png";

const experiences: TExperience[] = [
  {
    title: "Frontend Developer",
    companyName: "Google",
    icon: google,
    iconBg: "#383E56",
    date: "Feb 2025 - Mar 2025",
    points: [
      "Developing and maintaining web applications using React.js.",
      "Collaborating with cross-functional teams to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing feedback.",
    ],
  },
  {
    title: "React Native Developer",
    companyName: "Google",
    icon: google,
    iconBg: "#E6DEDD",
    date: "Mar 2025 - Apr 2025",
    points: [
      "Developing and maintaining React Native applications.",
      "Collaborating with teams on product development.",
      "Ensuring responsive design and cross-platform compatibility.",
      "Contributing to code reviews.",
    ],
  },
  {
    title: "Web Developer",
    companyName: "Google",
    icon: google,
    iconBg: "#383E56",
    date: "Apr 25 - May 2025",
    points: [
      "Developing and maintaining web applications.",
      "Collaborating with teams on product development.",
      "Implementing responsive design and cross-browser compatibility.",
      "Participating in code reviews.",
    ],
  },
  {
    title: "Full stack Developer",
    companyName: "Google",
    icon: google,
    iconBg: "#E6DEDD",
    date: "May 2025 - Present",
    points: [
      "Developing and maintaining full-stack web applications.",
      "Collaborating with cross-functional teams.",
      "Ensuring responsive design and cross-browser compatibility.",
      "Contributing to code reviews and providing feedback.",
    ],
  },
];

export { experiences }; 