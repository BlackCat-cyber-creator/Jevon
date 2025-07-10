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
    fullName: "Cap'n Jevon, Master of the Code Seas",
    email: "jevonyoshield@mail.com", // Keeping practical email as is
  },
  hero: {
    name: "Cap'n J",
    p: ["I forge grand visual tales,", "charts for yer crew, and webs o' wonder for the digital seas."],
  },
  contact: {
    p: "Send yer message, matey",
    h2: "Hail Me!",
  },
  sections: {
    about: {
      p: "A Seadog's Tale",
      h2: "My Voyage.",
      content: `A seasoned software buccaneer with mastery o' TypeScript, JavaScript,
        React, Node.js, and Three.js. I learn quick as a scurvy dog and collaborate with fellow captains
        to forge swift, mighty, and easy-to-sail solutions. Let's join forces
        and bring yer grandest visions to life, arr!`,
    },
    experience: {
      p: "My Adventures So Far",
      h2: "My Plunders.",
    },
    feedbacks: {
      p: "What the Crew Whispers",
      h2: "Shanties o' Praise.",
    },
    works: {
      p: "My Booty",
      h2: "Grand Heists.",
      content: `Behold, me skills showcased through real-world ventures with brief charts,
        links to the code's treasure, and live demonstrations. This be a testament
        to my knack for conquerin' knotty problems, wieldin' diverse technologies,
        and steerin' projects with a firm hand.`,
    },
  },
};
