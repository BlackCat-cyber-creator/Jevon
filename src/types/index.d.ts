export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
  icon?: string;
  role?: string;
  location?: string;
  tags?: string[];
} & Required<Pick<TCommonProps, "title">>;

export type TTestimonial = {
  testimonial: string;
  designation: string;
  company: string;
  image: string;
} & Required<Pick<TCommonProps, "name">>;

export type TProject = {
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  websiteLink?: string;
  githubLink?: string;
  favicon?: string;
  category?: "fullstack" | "ai" | "web" | "mobile";
  highlights?: string[];
  featured?: boolean;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = {
  name: string;
  icon: string;
  category?: "frontend" | "backend" | "database" | "devops" | "creative";
  level?: string;
  description?: string;
};

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TService = {
  title: string;
  icon: string;
  subtitle?: string;
  description?: string;
  skills?: string[];
  accentColor?: string;
};

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
