type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Jevon — Portfolio",
    fullName: "Jevon Nald0 Yoshield",
    email: "jevonyoshield@mail.com",
  },
  hero: {
    name: "Jevon",
    p: ["I develop 3D visuals, user", "interfaces and web applications"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `A skilled software developer with expertise in TypeScript, JavaScript,
        React, Node.js, and Three.js. I quickly learn and collaborate with clients
        to create efficient, scalable, user-friendly solutions. Let's work together
        to bring your ideas to life!`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Showcasing my skills through real-world projects with brief descriptions,
        code links, and live demos. Reflects my ability to solve complex problems,
        work with diverse technologies, and manage projects effectively.`,
    },
  },
};
