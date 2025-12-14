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
    name: "Jevon",
    p: ["Builder of system and application"],
  },
  
  sections: {
    about: {
      p: "A Seadog's Tale",
      h2: "My Voyage.",
      content: `List of skills and expertise`,
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
      content: `some real-world projects, complete with live demos (click the icon)`,
    },
  },
};
