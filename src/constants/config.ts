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
    title: "Cap'n J's Treasure Map",
    fullName: "Jevon Naldo Yoshield",
    email: "jevonyoshield@mail.com", // Keeping practical email as is
  },
  hero: {
    name: "Cap'n J",
    p: ["I forge grand visual tales", "and webs o' wonder for yer crew."],
  },
  contact: {
    p: "Send yer message, matey",
    h2: "Hail Me!",
  },
  sections: {
    about: {
      p: "A Seadog's Tale",
      h2: "My Voyage.",
      content: `A swift software buccaneer mastering the enigmatic script. I partner with fellow captains to craft
        robust solutions and bring grand visions to life.`,
    },
    experience: {
      p: "",
      h2: "",
    },
    feedbacks: {
      p: "What the Crew Whispers",
      h2: "Shanties o' Praise.",
    },
    works: {
      p: "My Booty",
      h2: "Grand Heists.",
      content: `My skills unveiled through real-world projects, with code and live demos.
        A testament to solving knotty problems with diverse technologies.`,
    },
  },
};
