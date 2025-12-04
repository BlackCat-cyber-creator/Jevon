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
      content: `A swift buccaneer mastering the enigmatic script. I partner with you to craft
        robust solutions and bring our grand visions to life.`,
    },
    experience: {
      p: "",
      h2: "",
    },
    feedbacks: {
      p: "",
      h2: "",
    },
    works: {
      p: "My Booty",
      h2: "Grand Heists.",
      content: `Skills unveiled through real-world projects with live demos.
        A testament to solving knotty problems with diverse technologies.`,
    },
  },
};
